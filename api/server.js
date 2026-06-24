import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();

// 🔴 make sure Azure env var exists
const resend = new Resend(process.env.RESEND_API_KEY);

// middleware
app.use(express.json());

app.use(
  cors({
    origin: "*", // you can lock this later
  })
);

// health check (test in browser)
app.get("/", (req, res) => {
  res.status(200).send("API running on Azure");
});

// contact endpoint
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 🔴 validation (important)
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // 🔴 send email
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // keep for now
      to: "siphumathendo222@outlook.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("EMAIL SENT:", response);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    // 🔴 FULL DEBUG LOG (VERY IMPORTANT)
    console.error("EMAIL ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
      details: err,
    });
  }
});

// 🔴 Azure uses this port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});