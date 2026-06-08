import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENTS = ["info@evocrea.online", "mohammadswedan2003@gmail.com"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const safeData = {
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      company: String(company || "—").slice(0, 200),
      message: String(message).slice(0, 2000),
      timestamp: new Date().toISOString(),
    };

    if (!process.env.RESEND_API_KEY) {
      // No email service configured — log and return success so the form still works
      console.log(
        "[Contact Form] RESEND_API_KEY not set. Submission:",
        safeData,
      );
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px; border-bottom: 2px solid #FF5C28; padding-bottom: 12px;">
          New Demo Request — EvoCrea
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Name</td><td style="padding: 8px 0; font-size: 15px;">${safeData.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td><td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${safeData.email}" style="color: #FF5C28;">${safeData.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Company</td><td style="padding: 8px 0; font-size: 15px;">${safeData.company}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td><td style="padding: 8px 0; font-size: 15px; white-space: pre-wrap;">${safeData.message}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Submitted</td><td style="padding: 8px 0; font-size: 13px; color: #888;">${safeData.timestamp}</td></tr>
        </table>
        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee;">
          <a href="mailto:${safeData.email}" style="display: inline-block; padding: 12px 24px; background: #FF5C28; color: white; text-decoration: none; border-radius: 100px; font-size: 14px; font-weight: 600;">Reply to ${safeData.name}</a>
        </div>
      </div>
    `;

    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "EvoCrea Contact <onboarding@resend.dev>",
      to: RECIPIENTS,
      replyTo: safeData.email,
      subject: `New Demo Request from ${safeData.name}${safeData.company !== "—" ? ` — ${safeData.company}` : ""}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact Form] Error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
