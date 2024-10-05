const { ping } = require("../controllers");

const Router = require("express").Router();
const dogRoutes = require("./dog.route");

Router.use("/dog-facts", dogRoutes);
Router.get("/ping", ping);

module.exports = Router;
