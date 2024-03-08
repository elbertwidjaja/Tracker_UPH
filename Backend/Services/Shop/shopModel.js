import connection from "../../config/connection.js";

const Shops = {
  getAllShops: (callback) => {
    const query = "SELECT * FROM shop";
    connection.query(query, callback);
  },
};

export default Shops;
