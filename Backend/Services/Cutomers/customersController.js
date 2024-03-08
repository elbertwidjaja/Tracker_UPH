import Customers from "./customersModel.js";

const getAllCustomers = (req, res) => {
  Customers.getAllCustomers((err, customers) => {
    if (err) {
      console.error("Error getting customers:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(customers);
  });
};

const addCustomer = (req, res) => {
  const customerData = req.body;

  Customers.addCustomer(customerData, (err, result) => {
    if (err) {
      console.error("Error adding customer:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({
      message: "Customer added successfully",
      error: false,
      customerId: result.insertId,
    });
  });
};

const deleteCustomer = (req, res) => {
  const customerId = req.params.customerId;

  Customers.deleteCustomer(customerId, (err, result) => {
    if (err) {
      console.error("Error deleting customer:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    res.json({ message: "Customer deleted successfully" });
  });
};

const editCustomer = (req, res) => {
  const customerId = req.params.customerId;
  const customerData = req.body;

  Customers.editCustomer(customerId, customerData, (err, result) => {
    if (err) {
      console.error("Error editing customer:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({
      message: "Customer edited successfully",
      customerId,
      ...customerData,
    });
  });
};

export default { getAllCustomers, addCustomer, editCustomer, deleteCustomer };
