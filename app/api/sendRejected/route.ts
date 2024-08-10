import { compieSendRejectedEmailTemplate, sendMail } from "@/lib/mail";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        // Parse the incoming JSON request
        const { email, fullName } = await req.json();

        // Await the template generation to get the actual HTML string
        const emailBody = await compieSendRejectedEmailTemplate(fullName);

        // Send the email
        const response = await sendMail({
            to: email,
            name: fullName,
            subject: "Application Updated",
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
