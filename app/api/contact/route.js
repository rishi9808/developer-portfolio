import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export async function POST(request) {
  try {
    const formData = await request.json();
    const { firstName, lastName, email, subject, message } = formData;

    // Configure email data
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: 'hello@designsvault.com',
      subject: subject,
      text: message,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: 'Email sent successfully',
      success: true
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
