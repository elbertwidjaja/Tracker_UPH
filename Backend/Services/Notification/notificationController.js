import connection from "../../config/connection.js";

const getNotification = (req, res) => {
  //To get Today date in YYYY-MM-DD format
  const today = new Date();
  const todayString = today.toISOString().slice(0, 10);

  //To get tomorrow date in YYYY-MM-DD format
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().slice(0, 10);

  console.log(todayString);
  console.log(tomorrowString);

  const getNotifQuery =
    "SELECT * FROM transaction WHERE due_date BETWEEN ? AND ?";

  connection.query(
    getNotifQuery,
    [todayString, tomorrowString],
    (err, results) => {
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
    }
  );
};

export default getNotification;
