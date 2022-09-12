import { sendMailController } from './../controllers/index';
import { Router } from 'express';
import { TRoute } from './../lib/types';
import { setupRouter } from '../lib';
import productsRouter from "./products";
import Crud from '../lib/crud';
import validate from '../middlewares/validator';

const router: Router = Router();

const advantagesCrud: Crud = new Crud("advantages");
const servicesCrud: Crud = new Crud("services");

router.get("/advantages", advantagesCrud.get);
router.get("/services", servicesCrud.get);

router.post("/send_message", validate("send_mail"), sendMailController);

const apiRoutes: TRoute[] = [
    { path: "/products", router: productsRouter },
]

setupRouter(apiRoutes, router);

export default router;
