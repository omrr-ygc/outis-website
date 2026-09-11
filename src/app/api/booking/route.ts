import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const NOTIFY_EMAIL = "info@outisclips.com";
const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function isSlotInPast(date: string, time: string): boolean {
  const [hours, minutes] = time.split(":").map(Number);
  const slotDate = new Date(date + "T00:00:00");
  slotDate.setHours(hours, minutes, 0, 0);

  const now = new Date();
  return slotDate <= now;
}

export async function GET() {
  const { data, error } = await supabase
    .from("bookings")
    .select("date, time");

  if (error) {
    return NextResponse.json({ bookedSlots: [] });
  }

  const bookedSlots = (data || []).map((b) => `${b.date}T${b.time}`);
  return NextResponse.json({ bookedSlots });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, date, time } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Name, email, date and time are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (isSlotInPast(date, time)) {
      return NextResponse.json(
        { error: "This time slot has already passed. Please choose a future time." },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from("bookings")
      .select("id")
      .eq("date", date)
      .eq("time", time)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "This time slot is no longer available. Please choose another." },
        { status: 409 }
      );
    }

    const safeName = sanitize(name.trim());
    const safeCompany = sanitize((company || "").trim());
    const safeMessage = sanitize((message || "").trim());

    const { data: inserted, error: insertError } = await supabase
      .from("bookings")
      .insert({
        name: safeName,
        email: email.trim(),
        company: safeCompany,
        message: safeMessage,
        date,
        time,
      })
      .select("id")
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "This time slot is no longer available. Please choose another." },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    try {
      await resend.emails.send({
        from: "Outis Clips <info@outisclips.com>",
        to: [email.trim()],
        subject: `Strategy Call Confirmed / Strateji Görüşmeniz Onaylandı`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
            <div style="padding: 32px 0; border-bottom: 1px solid #e5e5e5;">
              <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 8px 0; color: #1a1a1a;">Outis Clips</h1>
            </div>

            <div style="padding: 32px 0;">
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Hi ${safeName},</p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Your strategy call has been confirmed. We will reach out to you with the meeting details shortly.</p>

              <div style="background: #f8f8f8; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <p style="font-size: 14px; margin: 0 0 4px 0; color: #666;">Date / Tarih</p>
                <p style="font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">${date}</p>
                <p style="font-size: 14px; margin: 0 0 4px 0; color: #666;">Time / Saat</p>
                <p style="font-size: 16px; font-weight: 600; margin: 0;">${time}</p>
              </div>

              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0;" />

              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Merhaba ${safeName},</p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Strateji görüşmeniz onaylanmıştır. Görüşme detaylarını en kısa sürede sizinle paylaşacağız.</p>

              <p style="font-size: 13px; line-height: 1.6; color: #999; margin: 28px 0 0 0;">
                If you need to reschedule, please contact us at ${NOTIFY_EMAIL}<br/>
                Yeniden planlamak isterseniz ${NOTIFY_EMAIL} adresinden bize ulaşabilirsiniz.
              </p>
            </div>

            <div style="padding: 20px 0; border-top: 1px solid #e5e5e5;">
              <p style="font-size: 12px; color: #999; margin: 0;">&copy; ${new Date().getFullYear()} Outis Media LLC</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

    try {
      await resend.emails.send({
        from: "Outis Clips Booking <info@outisclips.com>",
        to: [NOTIFY_EMAIL],
        subject: `Yeni Randevu: ${safeName} / ${date} ${time}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
            <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">Yeni Randevu Talebi</h2>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #666; width: 120px;">İsim</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 500;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #666;">E-posta</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${email.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #666;">Şirket</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${safeCompany || "Belirtilmedi"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #666;">Mesaj</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${safeMessage || "Belirtilmedi"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #666;">Tarih</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 600;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; color: #666;">Saat</td>
                <td style="padding: 10px 12px; font-weight: 600;">${time}</td>
              </tr>
            </table>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send team notification:", emailErr);
    }

    return NextResponse.json({ success: true, booking: { id: inserted?.id, date, time } });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
