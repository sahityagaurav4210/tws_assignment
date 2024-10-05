const {
  createNewDogFact,
  getAllDogFacts,
  deleteDogFactById,
} = require("../controllers/dog.controller");

const dogRoutes = require("express").Router();

dogRoutes.post("/create", createNewDogFact);
dogRoutes.get("/list", getAllDogFacts);
dogRoutes.delete("/:id", deleteDogFactById);

module.exports = dogRoutes;
