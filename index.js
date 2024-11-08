
//test//check///

const express = require("express");
const app = express();
const PORT = 3000;


app.get("/status", (req, res) => {
  res.json({ message: "API is running successfully" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
