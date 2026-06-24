const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("API running on Azure");
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "siphumathendo222@outlook.com",
      subject: "New Contact",
      html: `
        <p>${name}</p>
        <p>${email}</p>
        <p>${message}</p>
      `,
    });

    console.log("EMAIL SENT:", response);

    res.json({ success: true });
  } catch (err) {
    console.error("ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Running on " + PORT));