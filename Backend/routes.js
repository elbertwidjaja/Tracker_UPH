import express from "express";

import customersController from "./Services/Cutomers/customersController.js";
import shopController from "./Services/Shop/shopController.js";
import getAllItems from "./Services/Item/itemController.js";
import transactonController from "./Services/Transactions/transactonController.js";
import authenticate from "./Middleware/Auth.js";
import authController from "./Services/Authentication/authController.js";
import getDataByCustomerId from "./Services/Profile/ProfileController.js";

import adminController from "./Services/Admin/adminController.js";

const routes = express.Router();

routes.post("/login", authController.login);
routes.get("/logout", authController.logout);

routes.get("/profile", authenticate, getDataByCustomerId);

routes.get("/customers", customersController.getAllCustomers);
routes.post("/customers", customersController.addCustomer);
routes.delete("/customers/:customerId", customersController.deleteCustomer);
routes.put("/customers/:customerId", customersController.editCustomer);

routes.get("/shops", shopController.getAllShops);

routes.get("/items", getAllItems);

routes.get("/transaction", transactonController.getAllTransactions);
routes.get(
  "/transaction/customer",
  authenticate,
  transactonController.getCustomerTransactions
);
routes.post("/transaction", authenticate, transactonController.addTransaction);

// ADMIN ROUTES

routes.post(
  "/admin/transactions",
  authenticate,
  adminController.adminInsertTransactionsbyId
);

routes.get(
  "/admin/transactions/:transactionId",
  adminController.adminGetTransactionById
);

routes.post("/admin/login", adminController.adminLogin);
routes.get("/admin/items", authenticate, shopController.getItemsByShopId);

export default routes;
