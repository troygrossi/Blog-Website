const express = require("express");
const routes = require("./controllers/index.js");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// handlebars middleware
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.listen(PORT, () => console.log("Now listening"));
