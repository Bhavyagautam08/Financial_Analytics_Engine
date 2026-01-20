import jwt from "jsonwebtoken";

export const validation = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Validation Middleware - Headers:", req.headers); // Log all headers

    if (!authHeader) {
      console.log("Validation Error: Missing Authorization Header");
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("Validation Error: Missing Token in Bearer Header");
      return res.status(401).json({ message: "Token not found in header" });
    }

    console.log("Verifying token:", token.substring(0, 10) + "..."); // Log partial token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified. User ID:", decoded.id);

    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    console.error("Validation Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
