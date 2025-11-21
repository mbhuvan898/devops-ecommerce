// backend/utils/sendEmail.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ email, templateId, data }) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_MAIL,      // verified sender
      templateId,
      dynamicTemplateData: data,            // ✅ correct property name
    };

    await sgMail.send(msg);
    console.log(`✅ Email sent successfully to ${email}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error.response?.body || error.message);
  }
};

module.exports = sendEmail;
