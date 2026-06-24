import { Resend } from "resend";

export async function POST({ request }) {
  try {
    const { name, email, message } = await request.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "siphumathendo222@outlook.com",
      subject: "New Contact",
      html: `
        <h2>New Message</h2>
        <p>${name}</p>
        <p>${email}</p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, response }), {
      status: 200,
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}