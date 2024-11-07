import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRETKEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    console.log(req.headers); // For debugging headers
    const token = req.headers['authorization']?.split(' ')[1];
   
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRETKEY); // Use the secret key from the .env file
        req.user = decoded; // Attach the decoded token (user info) to the request
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("JWT Verification Error:", error); // Log any verification errors
        return res.status(403).json({ message: "Invalid token." });
    }
};

export default verifyToken;
