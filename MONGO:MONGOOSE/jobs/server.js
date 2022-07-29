const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());
// This will fire our mongoose.connect statement to initialize our database connection
require("./server/config/mongoose.config");

// MUST CONNECT ROUTES TO SERVER
require("./server/routes/job.routes");
// (app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
