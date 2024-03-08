import connection from "../../config/connection.js";

const getAllTransactions = (req, res) => {
  const getAllTransactionsQuery = "SELECT * FROM `transaction`";

  connection.query(getAllTransactionsQuery, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({
        error: true,
        message: "Error in retrieving transactions",
      });
    }
    return res.status(200).json({
      error: false,
      transactions: results,
    });
  });
};

const getCustomerTransactions = (req, res) => {
  const { customerId } = req.user;
  console.log(customerId, "HAHAHAH");

  const getCustomerTransactionsQuery =
    "SELECT * FROM `transaction` WHERE customer_id = ?";

  connection.query(
    getCustomerTransactionsQuery,
    [customerId],
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({
          error: true,
          message: "Error in retrieving transactions",
        });
      }
      return res.status(200).json({
        error: false,
        transactions: results,
      });
    }
  );
};

const addTransaction = (req, res) => {
  const { customerId, shopId, itemId, itemName, purchaseDate, dueDate } =
    req.body;
  const addTransactionQuery =
    "INSERT INTO `transaction` (customer_id, shop_id, item_id, item_name, purchase_date, due_date) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    addTransactionQuery,
    [customerId, shopId, itemId, itemName, purchaseDate, dueDate],
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({
          error: true,
          message: "Error in adding transaction",
        });
      }
      return res.status(200).json({
        error: false,
        message: "Transaction added successfully",
        transactionId: results.insertId,
      });
    }
  );
};

export default { getAllTransactions, getCustomerTransactions, addTransaction };
