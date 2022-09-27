import { Request } from "express";
import { createController, sendEmail } from "../lib";
import DbOperations from "../providers/db/operations";
const { common } = DbOperations;
const { index } = DbOperations;

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

export const getSliderImagesController = createController(async (req: Request) => {
    return {
        items: await common.select("slider_images", ["title", "mobile"])
    };
});

export const getServicesController = createController(async (req: Request) => {
    const { language } = req.headers;
    const qp = req.query.page;
    const qrpp = req.query.rowsPerPage;
    const page: number = Number.isNaN(parseInt((Array.isArray(qp) ? qp[0] : qp) + "" || "a")) ? 1 : parseInt((Array.isArray(qp) ? qp[0] : qp) + "" || "a");
    const rowsPerPage: number = Number.isNaN(parseInt((Array.isArray(qrpp) ? qrpp[0] : qrpp) + "" || "a")) ? 100 : parseInt((Array.isArray(qrpp) ? qrpp[0] : qrpp) + "" || "a");
    return {
        items: (await index.getServices(language, page, rowsPerPage)).map((el: any) => {
            return {
                ...el,
                description: el.description.split("^^^^")
            }
        })
    }
});