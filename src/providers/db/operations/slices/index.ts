import operations from "../common";

export default {
    getProductTypes(language: string | string[] | undefined) {
        return operations.exec(
            `SELECT id, title_${language} title, image FROM product_types`
        )
    },
    getProducts(language: string | string[] | undefined, typeId: string, page: number, rowsPerPage: number) {
        return operations.exec(
            `SELECT id, title_${language} title, description_${language} description, price FROM products ` +
            "WHERE `type_id` = ? " +
            "LIMIT ?, ?",
            [typeId, (page - 1) * rowsPerPage, rowsPerPage]
        );
    },
    getCurrentProduct(language: string | string[] | undefined, id: string) {
        return operations.exec(
            `SELECT id, title_${language} title, description_${language} description, price FROM products ` +
            "WHERE id = ?",
            [id]
        );
    },
    getServices(language: string | string[] | undefined, page: number, rowsPerPage: number) {
        return operations.exec(
            `SELECT id, title_${language} title, description_${language} description, image FROM services`,
            [(page - 1) * rowsPerPage, rowsPerPage]
        );
    }
};
