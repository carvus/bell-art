import { Router } from "express";
import { getProductsController } from './../controllers/products';
import Crud from "../lib/crud";

const router: Router = Router();

const typesCrud: Crud = new Crud("product_types");
const productsCrud: Crud = new Crud("products");

router.get("/types", typesCrud.get);

router.get("/:typeId", getProductsController);
router.get("/current/:id", productsCrud.current);

export default router;