import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let resendInstance = null;

  function getResend() {
    if (!resendInstance) {
      const apiKey = process.env.RESEND_API_KEY;

      if (apiKey && apiKey.trim() !== "") {
        resendInstance = new Resend(apiKey);
        console.log("✅ Resend client initialized");
      }
    }

    return resendInstance;
  }

  app.post("/api/apply", async (req, res) => {
    const {
      fullName,
      email,
      phone,
      position,
      bodyText,
    } = req.body;

    const targetEmail = "hrmanager@htc.co.tz";

    const mailSubject =
      `[Job Application] ${position || "Position"} - ${fullName || "Applicant"}`;

    const mailHtml =
      bodyText?.trim()
        ? bodyText.replace(/\n/g, "<br>")
        : `
          <h2>New Job Application</h2>

          <p><strong>Full Name:</strong> ${fullName || "N/A"}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Position:</strong> ${position || "N/A"}</p>

          <hr />

          <p>Application submitted through the HTC Africa careers portal.</p>
        `;

    try {
      const resend = getResend();

      if (!resend) {
        console.error("❌ RESEND_API_KEY missing");

        return res.status(500).json({
          success: false,
          message: "Email service is not configured.",
        });
      }

      const result = await resend.emails.send({
        from: "HTC Africa <careers@htc.co.tz>",
        to: targetEmail,
        subject: mailSubject,
        html: mailHtml,
        replyTo: email,
      });

      if (result.error) {
        console.error("❌ Resend Error:", result.error);

        return res.status(500).json({
          success: false,
          message: result.error.message,
        });
      }

      console.log("✅ Application email sent");
      console.log("Email ID:", result.data?.id);

      return res.status(200).json({
        success: true,
        emailId: result.data?.id,
        message: "Application submitted successfully.",
      });
    } catch (error) {
      console.error("❌ Email Dispatch Failed:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to submit application.",
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("🚀 Starting Vite middleware");

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    console.log("🚀 Production mode");

    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ HTC Africa server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
});