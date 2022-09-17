import operations from "../common";

export default {
    getProducts(language: string | string[] | undefined, typeId: string, page: number, rowsPerPage: number) {
        return operations.exec(
            `SELECT id, title_${language}, description_${language}, price, type_id FROM products ` +
            "WHERE `type_id` = ? " +
            "LIMIT ?, ?",
            [typeId, (page - 1) * rowsPerPage, rowsPerPage]
        );
    },
    getCurrentProduct(language: string | string[] | undefined, id: string) {
        return operations.exec(
            `SELECT id, title_${language}, description_${language}, price, type_id FROM products ` +
            "WHERE id = ?",
            [id]
        );
    },
    getServices(language: string | string[] | undefined, page: number, rowsPerPage: number) {
        return operations.exec(
            `SELECT id, title_${language}, description_${language}, image FROM services`,
            [(page - 1) * rowsPerPage, rowsPerPage]
        );
    }
};
