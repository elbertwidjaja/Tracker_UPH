import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../../config/connection.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const query = "SELECT * FROM `admin` WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const admin = results[0];
      // const isPasswordValid = await bcrypt.compare(password, admin.password);
      // console.log(isPasswordValid);

      // if (!isPasswordValid) {
      //   return res.status(401).json({ message: "Invalid email or password" });
      // }

      const tokenPayload = {
        email: admin.email,
        id: admin.id,
        shopId: admin.shop_id,
        shopName: admin.shop_name,
      };
      const token = jwt.sign(tokenPayload, "SECRET");
      return res.status(200).json({
        error: false,
        message: "Login successful",
        data: {
          tokenPayload,
          token,
        },
      });
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminInsertTransactionsbyId = (req, res) => {
  const { customerId, itemId, itemName, purchaseDate, dueDate } = req.body;
  const shopName = req.user.shopName;
  const shopId = req.user.shopId;

  const insertTransactionQuery =
    "INSERT INTO `transaction` (customer_id, shopId, item_id, item_name, purchase_date, due_date, shop_name) VALUES (?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    insertTransactionQuery,
    [customerId, shopId, itemId, itemName, purchaseDate, dueDate, shopName],
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({
          error: true,
          message: "Error inserting transactions",
        });
      }
      return res.status(200).json({
        error: false,
        message: "Transactions inserted successfully",
        transactionId: results.insertId,
      });
    }
  );
};

const adminGetTransactionById = (req, res) => {
  const { transactionId } = req.params;

  const getTransactionQuery =
    "SELECT * FROM `transaction` WHERE transaction_id = ?";

  connection.query(getTransactionQuery, [transactionId], (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({
        error: true,
        message: "Error fetching transaction",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: true,
        message: "Transaction not found",
      });
    }

    const transaction = results[0];
    return res.status(200).json({
      error: false,
      message: "Transaction fetched successfully",
      transaction,
    });
  });
};

export default {
  adminInsertTransactionsbyId,
  adminLogin,
  adminGetTransactionById,
};
