const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();
    // console.log("Received Token in Backend:", token); 

    if (!token) {
        return res.status(401).json({ message: "No token provided or incorrect format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;