import operations from "../common";

export default {
    getProducts(typeId: string, page: number, rowsPerPage: number) {
        return operations.exec(
            "SELECT * FROM `products` " +
            "WHERE `type_id` = ? " +
            "LIMIT ?, ?",
            [typeId, (page - 1) * rowsPerPage, rowsPerPage]
        );
    }
};
