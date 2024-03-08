import connection from "../../config/connection.js";

const getAllItems = (req, res) => {
  const getAllItemsQuery = "SELECT * FROM item";

  connection.query(getAllItemsQuery, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({
        error: true,
        message: "Error in retrieving items",
      });
    }
    return res.status(200).json({
      error: false,
      items: results,
    });
  });
};

export default getAllItems;
