import jwt from "jsonwebtoken";
import connection from "../../config/connection.js";

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = "SELECT * FROM customer WHERE email = ? ";

  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({
        error: true,
        message: "Error in retrieving customer",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const customer = results[0];

    if (customer.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ customerId: customer.customerId }, "SECRET");
    const userId = customer.customerId;
    return res.status(200).json({
      error: false,
      message: "Login successful",
      data: {
        token,
        userId,
      },
    });
  });
};

const logout = (req, res) => {
  return res.status(200).json({ message: "Logged out successfully" });
};

export default { login, logout };
