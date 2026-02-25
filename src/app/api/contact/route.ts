import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactForm = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // 1. Send notification email to the business owner
    await resend.emails.send({
      from: "Fist Gear <onboarding@resend.dev>",
      to: "talha.asjad.at@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 2. Send confirmation email to the customer
    await resend.emails.send({
      from: "Fist Gear <onboarding@resend.dev>",
      to: email,
      subject: "We received your message — Fist Gear",
      html: `
        <h2>Thank you for reaching out, ${firstName}!</h2>
        <p>We've received your message regarding <strong>"${subject}"</strong> and our team will get back to you shortly.</p>
        <br/>
        <p>— The Fist Gear Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
