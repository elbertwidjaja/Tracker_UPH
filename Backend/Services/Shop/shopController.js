import Shops from "./shopModel.js";
import connection from "../../config/connection.js";

const getAllShops = (req, res) => {
  Shops.getAllShops((err, shops) => {
    if (err) {
      console.error("Error getting shops:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(shops);
  });
};

const getItemsByShopId = (req, res) => {
  const shop_id = req.user.shopId;

  const query = "SELECT * FROM item WHERE shop_id = ?";
  connection.query(query, [shop_id], (err, items) => {
    if (err) {
      console.error("Error getting items:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(items);
  });
};

export default { getAllShops, getItemsByShopId };
