import { Request, Response, Router } from 'express'
import multer from 'multer'

import CreateCategoryController from './controllers/category/CreateCategoryController'
import ListCategoryController from './controllers/category/ListCategoryController'
import CreateProductController from './controllers/product/CreateProductController'
import AuthUserCnotroller from './controllers/user/AuthUserController'
import CreateUserController from './controllers/user/CreateUserController'
import DetailUserController from './controllers/user/DetailUserController'

import uploadConfig from './config/multer'
import DeleteCategoryController from './controllers/category/DeleteCategoryController'
import AddItemController from './controllers/order/AddItemController'
import CancelOrderController from './controllers/order/CancelOrderController'
import CreateOrderController from './controllers/order/CreateOrderController'
import DetailOrderController from './controllers/order/DetailOrderController'
import FinishOrderController from './controllers/order/FinishOrderController'
import GetOrderByIdController from './controllers/order/GetOrderByIdController'
import ListOrdersController from './controllers/order/ListOrdersController'
import ProcessOrderController from './controllers/order/ProcessOrderController'
import RemoveItemController from './controllers/order/RemoveItemController'
import RemoveOrderController from './controllers/order/RemoveOrderController'
import SendOrderController from './controllers/order/SendOrderController'
import SendOrderFullController from './controllers/order/SendOrderFullController'
import DeleteProductController from './controllers/product/DeleteProductController'
import GetAllProductsController from './controllers/product/GetAllProductsController'
import CreateTableController from './controllers/table/CreateTableController'
import GetTableController from './controllers/table/GetTableController'
import AcceptUserController from './controllers/user/AcceptUserController'
import AlterRoleUserController from './controllers/user/AlterRoleUserController'
import DeleteUserController from './controllers/user/DeleteUserController'
import GetUsersController from './controllers/user/GetUsersController'
import RejectUserController from './controllers/user/RejectUserController'
import UpdateUserPasswordConroller from './controllers/user/UpdateUserPasswordConroller'
import { getUserIdFromToken } from './middlewares/getUserFromToken'
import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))
// ROTAS USER
router.post('/users', CreateUserController.handle)
router.get('/users/all', isAuthenticated, GetUsersController.handle)
router.post('/session', AuthUserCnotroller.handle)
router.put('/users/accept', isAuthenticated, AcceptUserController.handle)
router.put('/users/reject', isAuthenticated, RejectUserController.handle)
router.delete('/users/:id', isAuthenticated, DeleteUserController.handle)
router.get('/me', isAuthenticated, DetailUserController.handle)
router.put('/user/alter/role', isAuthenticated, AlterRoleUserController.handle)
router.put(
  '/users/change-password',
  isAuthenticated,
  UpdateUserPasswordConroller.handle,
)

// ROTAS CATEGORIAS
router.post('/category', isAuthenticated, CreateCategoryController.handle)
router.get('/category', isAuthenticated, ListCategoryController.handle)
router.delete('/category/:id', isAuthenticated, DeleteCategoryController.handle)

// ROTAS PRODUCT
router.post(
  '/product',
  isAuthenticated,
  upload.single('file'),
  CreateProductController.handle,
)
router.get('/product/all', isAuthenticated, GetAllProductsController.handle)
router.delete('/product/:id', isAuthenticated, DeleteProductController.handle)
router.get('/category/product', isAuthenticated, ListCategoryController.handle)

// ROTAS ORDER
router.post(
  '/order',
  isAuthenticated,
  getUserIdFromToken,
  CreateOrderController.handle,
)
router.delete('/order', isAuthenticated, RemoveOrderController.handle)
router.get('/order/:id', isAuthenticated, GetOrderByIdController.handle)

router.post('/order/add', isAuthenticated, AddItemController.handle)
router.delete('/order/remove', isAuthenticated, RemoveItemController.handle)

router.put('/order/send', isAuthenticated, SendOrderController.handle)
router.put('/order/send-full', isAuthenticated, SendOrderFullController.handle)
router.get('/orders', isAuthenticated, ListOrdersController.handle)
router.get('/order/detail', isAuthenticated, DetailOrderController.handle)
router.put('/order/finish', isAuthenticated, FinishOrderController.handle)
router.put('/order/process', isAuthenticated, ProcessOrderController.handle)
router.put('/order/cancel', isAuthenticated, CancelOrderController.handle)

// TABLES
router.get('/tables', isAuthenticated, GetTableController.handle)
router.post('/tables', isAuthenticated, CreateTableController.handle)

export { router }
