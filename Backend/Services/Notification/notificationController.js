import connection from "../../config/connection.js";

const getNotification = (req, res) => {
  const { customerId } = req.user;

  const getNotifQuery =
    "SELECT * FROM transaction WHERE customer_id = ? ORDER BY due_date ASC " +
    "LIMIT 2";

  connection.query(getNotifQuery, [customerId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: true,
        message: "Error in retrieving items",
      });
    }
    return res.status(200).json({
      error: false,
      data: results,
    });
  });
};

export default getNotification;
