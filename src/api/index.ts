import { getSliderImagesController, sendMailController, getServicesController } from './../controllers/index';
import { Router } from 'express';
import { TRoute } from './../lib/types';
import { setupRouter } from '../lib';
import productsRouter from "./products";
import validate from '../middlewares/validator';
import withTranslations from '../middlewares/withTranslations';

const router: Router = Router();

router.get("/services", withTranslations, getServicesController);
router.get("/slider_images", getSliderImagesController);
router.post("/send_message", validate("send_mail"), sendMailController);

const apiRoutes: TRoute[] = [
    { path: "/products", router: productsRouter, middlewares: [withTranslations] },
]

setupRouter(apiRoutes, router);

export default router;
