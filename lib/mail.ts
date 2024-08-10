import nodemailer from "nodemailer";
import handlebars from "handlebars";
import toast from "react-hot-toast";
import { ThankYou } from "./designs/thank-you";
import { sendSelected } from "./designs/sendSelected";
import { sendRejected } from "./designs/sendRejected";

export const sendMail = async ({
  to,
  name,
  jobTitle,
  companyName,
  subject,
  body,
}: {
  to: string;
  name: string;
  jobTitle?: string;
  companyName?: string;
  subject: string;
  body: string;
}) => {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const textResult = await transport.verify();
    console.log(textResult);
  } catch (error) {
    console.error(error);
    toast.error("Failed to send email");
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    return sendResult;
  } catch (error) {
    console.error(error);
    toast.error("Failed to send email");
    return;
  }
};

export const compieThankYouEmailTemplate = async (
  name: string,
  jobTitle: string,
  companyName: string
) => {
  const template = handlebars.compile(ThankYou);

  const htmlBody = template({
    name: name,
    jobTitle: jobTitle,
    companyName: companyName,
  });

  return htmlBody;
};

export const compieSendSelectedEmailTemplate = async (
  name: string,
  title: string
) => {
  const template = handlebars.compile(sendSelected);

  const htmlBody = template({
    name: name,
    jobTitle: title,
  });

  return htmlBody;
};

export const compieSendRejectedEmailTemplate = async (
  name: string,
) => {
  const template = handlebars.compile(sendRejected);

  const htmlBody = template({
    name: name,
  });

  return htmlBody;
};
