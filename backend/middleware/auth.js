const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  // 👇 THIS LINE IS THE FIX
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("DECODED USER:", decoded); // debug

    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};