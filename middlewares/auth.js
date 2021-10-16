const jwt = require("jsonwebtoken");
const { SECRET_KEY: secret_key } = process.env;
console.log("secret_key", secret_key);

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token error" });
  }

  const [schema, token] = parts;
  console.log("########################");
  console.log("token", token);
  console.log("########################");

  // if (!/Bearer$/i.test(scheme)) {
  if (schema.toLowerCase() !== "bearer") {
    return res.status(401).json({ error: "Token malformatted" });
  }

  jwt.verify(token, secret_key, (err, data) => {
    if (err) {
      res.status(401).json({ error: "Token Invalid" });
    }

    next();
  });
};
