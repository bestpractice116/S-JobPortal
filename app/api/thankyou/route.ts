import { compieThankYouEmailTemplate, sendMail } from "@/lib/mail";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        // Parse the incoming JSON request
        const { email, fullName, title, name } = await req.json();

        // Await the template generation to get the actual HTML string
        const emailBody = await compieThankYouEmailTemplate(fullName, title, name);

        // Send the email
        const response = await sendMail({
            to: email,
            name: fullName,
            jobTitle: title,
            companyName: name,
            subject: "Thank you for applying",
            body: emailBody,
        });

        if (response?.messageId) {
            return NextResponse.json("Email sent successfully", { status: 200 });
        } else {
            return NextResponse.json("Failed to send email", { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json("Failed to process request", { status: 500 });
    }
};
