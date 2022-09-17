import { Router } from "express";
import { getCurrentProductController, getProductsController, getProductTypesController } from './../controllers/products';

const router: Router = Router();

router.get("/types", getProductTypesController);

router.get("/:typeId", getProductsController);
router.get("/current/:id", getCurrentProductController);

export default router;