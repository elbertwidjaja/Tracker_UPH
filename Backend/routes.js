import express from "express";

import customersController from "./Services/Cutomers/customersController.js";
import shopController from "./Services/Shop/shopController.js";
import getAllItems from "./Services/Item/itemController.js";
import transactionController from "./Services/Transactions/transactonController.js";
import authenticate from "./Middleware/Auth.js";
import authController from "./Services/Authentication/authController.js";
import getDataByCustomerId from "./Services/Profile/ProfileController.js";
import getNotification from "./Services/Notification/notificationController.js";

import adminController from "./Services/Admin/adminController.js";

const routes = express.Router();

routes.get("/hello", (req, res) => {
  res.send("Hello, world!");
});

routes.post("/login", authController.login);
routes.get("/logout", authController.logout);

routes.get("/profile", authenticate, getDataByCustomerId);

routes.get("/customers", customersController.getAllCustomers);
routes.post("/customers", customersController.addCustomer);
routes.delete("/customers/:customerId", customersController.deleteCustomer);
routes.put("/customers/:customerId", customersController.editCustomer);

routes.get("/shops", shopController.getAllShops);

routes.get("/items", getAllItems);

routes.get("/transaction", transactionController.getAllTransactions);
routes.get(
  "/transaction/customer",
  authenticate,
  transactionController.getCustomerTransactions
);
routes.post("/transaction", authenticate, transactionController.addTransaction);

routes.delete(
  "/transaction/:transactionId",
  authenticate,
  transactionController.deleteTransactionById
);

routes.get("/notification", authenticate, getNotification);

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
