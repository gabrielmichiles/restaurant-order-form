const express = require("express");
const app = express();
const routes = require("./routes/index");

// retrieves route handling files
const connection = require("./db/connection.js");

// establishes connection to mongoDB then initializes server-side application
connection.then(() => {
  const server = app.listen(process.env.PORT || 8080, () =>
    console.log("Connected and listening.")
  );
});

// sets up routing for serving static files from a designated "public" folder
app.use(express.static("public"));

// parse request body from AJAX request
app.use(express.json());

// implements route handling from route files
app.use(routes);
