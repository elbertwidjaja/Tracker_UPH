import connection from "../../config/connection.js";

const getDataByCustomerId = (req, res) => {
  const { customerId } = req.user;
  console.log(req.user);

  const getDataQuery = "SELECT * FROM customer WHERE customerId = ?";

  connection.query(getDataQuery, [customerId], (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({
        error: true,
        message: "Error in retrieving data",
      });
    }
    return res.status(200).json({
      error: false,
      data: results,
    });
  });
};

export default getDataByCustomerId;
