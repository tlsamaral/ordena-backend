import { Request, Response, Router } from "express";
import multer from "multer";

import CreateCategoryController from "./controllers/category/CreateCategoryController";
import ListCategoryController from "./controllers/category/ListCategoryController";
import CreateProductController from "./controllers/product/CreateProductController";
import AuthUserCnotroller from "./controllers/user/AuthUserController";
import CreateUserController from "./controllers/user/CreateUserController";
import DetailUserController from "./controllers/user/DetailUserController";

import uploadConfig from "./config/multer";
import AddItemController from "./controllers/order/AddItemController";
import CreateOrderController from "./controllers/order/CreateOrderController";
import DetailOrderController from "./controllers/order/DetailOrderController";
import FinishOrderController from "./controllers/order/FinishOrderController";
import ListOrdersController from "./controllers/order/ListOrdersController";
import RemoveItemController from "./controllers/order/RemoveItemController";
import RemoveOrderController from "./controllers/order/RemoveOrderController";
import SendOrderController from "./controllers/order/SendOrderController";
import DeleteProductController from "./controllers/product/DeleteProductController";
import GetAllProductsController from "./controllers/product/GetAllProductsController";
import GetUsersController from "./controllers/user/GetUsersController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));
// ROTAS USER
router.post("/users", CreateUserController.handle);
router.get("/users", GetUsersController.handle);
router.post("/session", AuthUserCnotroller.handle);
router.get("/me", isAuthenticated, DetailUserController.handle);

// ROTAS CATEGORIAS
router.post("/category", isAuthenticated, CreateCategoryController.handle);
router.get("/category", isAuthenticated, ListCategoryController.handle);

// ROTAS PRODUCT
router.post(
	"/product",
	isAuthenticated,
	upload.single("file"),
	CreateProductController.handle,
);
router.get("/product/all", isAuthenticated, GetAllProductsController.handle);
router.delete("/product/:id", isAuthenticated, DeleteProductController.handle);
router.get("/category/product", isAuthenticated, ListCategoryController.handle);

// ROTAS ORDER
router.post("/order", isAuthenticated, CreateOrderController.handle);
router.delete("/order", isAuthenticated, RemoveOrderController.handle);

router.post("/order/add", isAuthenticated, AddItemController.handle);
router.delete("/order/remove", isAuthenticated, RemoveItemController.handle);

router.put("/order/send", isAuthenticated, SendOrderController.handle);
router.get("/orders", isAuthenticated, ListOrdersController.handle);
router.get("/order/detail", isAuthenticated, DetailOrderController.handle);
router.put("/order/finish", isAuthenticated, FinishOrderController.handle);

export { router };
