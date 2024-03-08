import Shops from "./shopModel.js";

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

export default { getAllShops };
