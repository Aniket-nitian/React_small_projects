import jwt from "jsonwebtoken";

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("Invalid token....");
    res.status(400).json({ errors: "Inalid token" });
  }
}

export default userMiddleware;
