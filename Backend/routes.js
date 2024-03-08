import express from "express";

import customersController from "./Services/Cutomers/customersController.js";
import shopController from "./Services/Shop/shopController.js";
import getAllItems from "./Services/Item/itemController.js";
import transactonController from "./Services/Transactions/transactonController.js";
import authenticate from "./Middleware/Auth.js";
import authController from "./Services/Authentication/authController.js";

const routes = express.Router();

routes.post("/login", authController.login);
routes.get("/logout", authController.logout);

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
routes.post("/transaction", transactonController.addTransaction);

export default routes;
