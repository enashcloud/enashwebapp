import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

app.use(
  cors({
    origin: "*", // allow all for now (fix later)
  })
);

app.get("/", (req, res) => {
  res.send("API running on Azure");
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "your@email.com",
      subject: "New Contact",
      html: `
        <p>${name}</p>
        <p>${email}</p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Running on " + PORT));