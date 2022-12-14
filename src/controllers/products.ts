import { Request } from "express";
import { createController } from "../lib";
import DbOperations from "../providers/db/operations";

const { common, index } = DbOperations;

export const getProductTypesController = createController(async (req: Request) => {
    const { language } = req.headers;
    return {
        items: (await index.getProductTypes(language)).map((el: { id: number, description: string, image: string, title: string }) => {
            return {
                ...el,
                description: JSON.parse(el.description)
            }
        })
    }
});

export const getProductsController = createController(async (req: Request) => {
    const { typeId } = req.params;
    const { language } = req.headers;
    const qp = req.query.page;
    const qrpp = req.query.rowsPerPage;
    const page: number = Number.isNaN(parseInt((Array.isArray(qp) ? qp[0] : qp) + "" || "a")) ? 1 : parseInt((Array.isArray(qp) ? qp[0] : qp) + "" || "a");
    const rowsPerPage: number = Number.isNaN(parseInt((Array.isArray(qrpp) ? qrpp[0] : qrpp) + "" || "a")) ? 100 : parseInt((Array.isArray(qrpp) ? qrpp[0] : qrpp) + "" || "a");
    const [productType] = await index.getProductType(language, typeId);
    const [{ count }] = await common.getRowsCount("products");

    return {
        pagesCount: Math.ceil(count / rowsPerPage),
        productType: {
            ...productType,
            description: JSON.parse(productType.description)
        },
        items: await index.getProducts(language, typeId, page, rowsPerPage)
    }
});

export const getCurrentProductController = createController(async (req: Request) => {
    const { id } = req.params;
    const { language } = req.headers;
    const [data] = await index.getCurrentProduct(language, id);
    return data;
});
