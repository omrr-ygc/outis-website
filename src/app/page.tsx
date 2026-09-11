import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoBanner from "@/components/VideoBanner";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import WhoWeServe from "@/components/WhoWeServe";
import BentoGrid from "@/components/BentoGrid";
import FAQ from "@/components/FAQ";
import BookingCalendar from "@/components/BookingCalendar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VideoBanner />
        <HowItWorks />
        <Comparison />
        <WhoWeServe />
        <BentoGrid />
        <FAQ />
        <BookingCalendar />
      </main>
      <Footer />
    </>
  );
}
