// backend/utils/sendEmail.js
const sgMail = require("@sendgrid/mail");

let isInitialized = false;

function initSendGrid() {
  // Do nothing in test environment
  if (process.env.NODE_ENV === "test") {
    return;
  }

  if (!isInitialized) {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SendGrid API key not configured");
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    isInitialized = true;
  }
}

const sendEmail = async ({ email, templateId, data }) => {
  // Lazy init
  initSendGrid();

  // Skip sending emails during tests
  if (process.env.NODE_ENV === "test") {
    return;
  }

  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_MAIL, // verified sender
      templateId,
      dynamicTemplateData: data,
    };

    await sgMail.send(msg);
    console.log(`✅ Email sent successfully to ${email}`);
  } catch (error) {
    console.error(
      "❌ Email sending failed:",
      error.response?.body || error.message
    );
  }
};

module.exports = sendEmail;
