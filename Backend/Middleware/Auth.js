import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  console.log("masuk pak");
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const authToken = token.split(" ")[1];

  jwt.verify(authToken, "SECRET", (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};

export default authenticate;
