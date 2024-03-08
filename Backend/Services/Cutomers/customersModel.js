import connection from "../../config/connection.js";

const Customers = {
  getAllCustomers: (callback) => {
    const query = "SELECT * FROM customer";
    connection.query(query, callback);
  },

  addCustomer: (customerData, callback) => {
    const query = "INSERT INTO customer SET ?";
    connection.query(query, customerData, callback);
  },

  deleteCustomer: (customerId, callback) => {
    const query = "DELETE FROM customer WHERE customerId = ?";
    connection.query(query, [customerId], callback);
  },

  editCustomer: (customerId, customerData, callback) => {
    const query = "UPDATE customer SET ? WHERE customerId = ?";
    connection.query(query, [customerData, customerId], callback);
  },
};

export default Customers;
