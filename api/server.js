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
  console.log("REQUEST BODY:", req.body);

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.log("MISSING DATA");
      return res.status(400).json({ error: "Missing fields" });
    }

    console.log("SENDING EMAIL...");

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "siphumathendo222@outlook.com",
      subject: "CONTACT FORM TEST",
      html: `
        <h1>NEW MESSAGE</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    });

    console.log("RESEND RESPONSE:", response);

    return res.json({
      success: true,
      response,
    });

  } catch (err) {
    console.error("FULL ERROR:", err);

    return res.status(500).json({
      error: err.message,
      full: err,
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Running on " + PORT));