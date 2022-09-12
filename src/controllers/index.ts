import { Request } from "express";
import { createController, sendEmail } from "../lib";

export const sendMailController = createController(async (req: Request) => {
    const { message, mail }: { message: string, mail: string } = req.body;
    return await sendEmail(mail, {
        subject: "Message from user",
        html: `
            <h1>Message from user</h1>
            <ul>
                <li>
                    <i><b>User mail</i></b> - ${mail}
                </li>
                <li>
                    <i><b>Message</b></i> - ${message}
                </li>
            </ul>
        `
    });
}); 