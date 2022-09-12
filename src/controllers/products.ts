import { Request } from "express";
import { createController } from "../lib";
import DbOperations from "../providers/db/operations";
const { common, index } = DbOperations;

export const getProductsController = createController(async (req: Request) => {
    const { typeId } = req.params;
    const qp = req.query.page;
    const qrpp = req.query.rowsPerPage;
    const page: number = Number.isNaN(parseInt((Array.isArray(qp) ? qp[0] : qp) + "" || "a")) ? 1 : parseInt((Array.isArray(qp) ? qp[0] : qp) + "" || "a");
    const rowsPerPage: number = Number.isNaN(parseInt((Array.isArray(qrpp) ? qrpp[0] : qrpp) + "" || "a")) ? 100 : parseInt((Array.isArray(qrpp) ? qrpp[0] : qrpp) + "" || "a");

    const [{ count }] = await common.getRowsCount("products");

    return {
        pagesCount: Math.ceil(count / rowsPerPage),
        items: await index.getProducts(typeId, page, rowsPerPage)
    }
});