"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const CITIES = [
  { lat: 40.7, lng: -74.0, name: "New York" },
  { lat: 51.5, lng: -0.1, name: "London" },
  { lat: 35.7, lng: 139.7, name: "Tokyo" },
  { lat: -33.9, lng: 18.4, name: "Cape Town" },
  { lat: 1.3, lng: 103.8, name: "Singapore" },
  { lat: -23.5, lng: -46.6, name: "São Paulo" },
  { lat: 25.2, lng: 55.3, name: "Dubai" },
  { lat: 41.0, lng: 29.0, name: "Istanbul" },
  { lat: 48.9, lng: 2.3, name: "Paris" },
  { lat: 34.1, lng: -118.2, name: "Los Angeles" },
  { lat: 19.4, lng: -99.1, name: "Mexico City" },
  { lat: -34.6, lng: -58.4, name: "Buenos Aires" },
  { lat: 55.8, lng: 37.6, name: "Moscow" },
  { lat: 22.3, lng: 114.2, name: "Hong Kong" },
  { lat: 37.6, lng: 127.0, name: "Seoul" },
  { lat: 52.5, lng: 13.4, name: "Berlin" },
  { lat: 30.0, lng: 31.2, name: "Cairo" },
  { lat: 28.6, lng: 77.2, name: "New Delhi" },
  { lat: -6.2, lng: 106.8, name: "Jakarta" },
  { lat: 13.8, lng: 100.5, name: "Bangkok" },
  { lat: 43.7, lng: -79.4, name: "Toronto" },
  { lat: -37.8, lng: 144.9, name: "Melbourne" },
  { lat: 39.9, lng: 116.4, name: "Beijing" },
  { lat: 6.5, lng: 3.4, name: "Lagos" },
  { lat: 59.3, lng: 18.1, name: "Stockholm" },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 9], [0, 20], [1, 8], [1, 15], [1, 12],
  [2, 4], [2, 14], [2, 22], [3, 6], [3, 23],
  [4, 13], [4, 18], [4, 19], [5, 11], [5, 0],
  [6, 7], [6, 17], [7, 8], [7, 12], [7, 16],
  [9, 10], [13, 14], [13, 22], [15, 24],
  [16, 23], [17, 19], [18, 21], [20, 0], [21, 2],
];

const GLOBE_RADIUS = 2.0;
const NODE_RADIUS = GLOBE_RADIUS + 0.02;

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function getArcPoints(start: THREE.Vector3, end: THREE.Vector3, segments: number = 48): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(NODE_RADIUS + dist * 0.25);
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  for (let i = 0; i <= segments; i++) {
    points.push(curve.getPoint(i / segments));
  }
  return points;
}

function createTextSprite(text: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = 256;
  canvas.height = 64;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 24px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.shadowColor = "rgba(26, 8, 8, 1)";
  ctx.shadowBlur = 8;
  ctx.fillStyle = "#e8c9a0";
  ctx.fillText(text, 128, 32);
  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.5, 0.125, 1);
  return sprite;
}

function CityNode({ position, name, groupRef }: { position: THREE.Vector3; name: string; groupRef: React.RefObject<THREE.Group | null> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const spriteRef = useRef<THREE.Sprite>(null);
  const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  const sprite = useMemo(() => createTextSprite(name), [name]);

  useEffect(() => {
    return () => {
      sprite.material.map?.dispose();
      sprite.material.dispose();
    };
  }, [sprite]);

  const labelPos = useMemo(() => {
    const dir = position.clone().normalize();
    return position.clone().add(dir.multiplyScalar(0.12));
  }, [position]);

  useFrame(({ clock, camera }) => {
    if (!meshRef.current || !glowRef.current || !spriteRef.current || !groupRef.current) return;

    const t = clock.getElapsedTime();
    const pulse = 0.8 + Math.sin(t * 2 + phaseOffset) * 0.3;
    meshRef.current.scale.setScalar(pulse);
    glowRef.current.scale.setScalar(pulse * 2.5);
    (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(t * 2 + phaseOffset) * 0.1;

    const worldPos = new THREE.Vector3();
    meshRef.current.getWorldPosition(worldPos);
    const cameraDir = camera.position.clone().normalize();
    const dotProduct = worldPos.clone().normalize().dot(cameraDir);

    const visible = dotProduct > 0.15;
    spriteRef.current.visible = visible;
    const opacity = visible ? Math.min(1, (dotProduct - 0.15) * 3) : 0;
    (spriteRef.current.material as THREE.SpriteMaterial).opacity = opacity * 0.85;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#e8c9a0" />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#c9956b" transparent opacity={0.2} />
      </mesh>
      <primitive ref={spriteRef} object={sprite} position={labelPos.clone().sub(position)} />
    </group>
  );
}

function AnimatedArc({ start, end, index }: { start: THREE.Vector3; end: THREE.Vector3; index: number }) {
  const arcPoints = useMemo(() => getArcPoints(start, end), [start, end]);
  const totalPoints = arcPoints.length;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const colors = new Float32Array(totalPoints * 3);
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [arcPoints, totalPoints]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const lineObj = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const colorAttr = geometry.getAttribute("color");
    const colors = colorAttr.array as Float32Array;
    const headPos = ((t * 0.3 + index * 0.2) % 1.4) - 0.2;

    for (let i = 0; i < totalPoints; i++) {
      const frac = i / (totalPoints - 1);
      const dist = Math.abs(frac - headPos);
      const trailLength = 0.25;
      const intensity = Math.max(0, 1 - dist / trailLength);
      const smoothed = intensity * intensity * (3 - 2 * intensity);

      colors[i * 3] = 0.78 * smoothed + 0.12 * (1 - smoothed);
      colors[i * 3 + 1] = 0.58 * smoothed + 0.06 * (1 - smoothed);
      colors[i * 3 + 2] = 0.42 * smoothed + 0.03 * (1 - smoothed);
    }
    colorAttr.needsUpdate = true;
  });

  return <primitive object={lineObj} />;
}

function Atmosphere() {
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(0.78, 0.58, 0.42, intensity * 0.2);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useEffect(() => {
    return () => {
      atmosphereMaterial.dispose();
    };
  }, [atmosphereMaterial]);

  return (
    <mesh scale={[1.08, 1.08, 1.08]}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.06;
  });

  const nodes = CITIES.map((c) => latLngToVec3(c.lat, c.lng, NODE_RADIUS));

  return (
    <group ref={groupRef}>
      <Atmosphere />

      <Sphere args={[GLOBE_RADIUS - 0.02, 64, 64]}>
        <meshBasicMaterial color="#1a0a0a" />
      </Sphere>

      <Sphere args={[GLOBE_RADIUS, 48, 48]}>
        <meshBasicMaterial color="#c9956b" wireframe transparent opacity={0.12} />
      </Sphere>

      <Sphere args={[GLOBE_RADIUS + 0.005, 24, 24]}>
        <meshBasicMaterial color="#e8c9a0" wireframe transparent opacity={0.05} />
      </Sphere>

      {CITIES.map((city, i) => (
        <CityNode key={city.name} position={nodes[i]} name={city.name} groupRef={groupRef} />
      ))}

      {CONNECTIONS.map(([a, b], i) => (
        <AnimatedArc key={i} start={nodes[a]} end={nodes[b]} index={i} />
      ))}
    </group>
  );
}

export default function Globe() {
  return (
    <div role="img" aria-label="Interactive 3D globe showing Outis Clips global distribution network across 25 major cities" className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, powerPreference: "default", alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}
