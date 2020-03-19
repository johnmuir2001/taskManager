const express = require("express");
require("./db/mongoose.js");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
  
app.listen(PORT, () => console.log(`listening on port ${PORT}`));