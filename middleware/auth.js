const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const expectedKey = process.env.API_KEY || "mysecrettoken123";

  if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  next();
};

module.exports = authMiddleware;