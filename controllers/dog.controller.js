const { ApiResponse, ApiStatus, HTTP_STATUS } = require("../api");
const { getDogFacts } = require("../helpers");
const DogFact = require("../models/dog_facts.model");

async function createNewDogFact(request, response) {
  const reply = new ApiResponse();
  const number = request.query.number || 1;
  const url = `${process.env.DOG_FACTS_URL}?number=${number}`;
  const apiResponse = await getDogFacts(url);
  const bulkOperation = [];

  if (
    !apiResponse ||
    !apiResponse.facts ||
    !Array.isArray(apiResponse.facts) ||
    !apiResponse.facts.length
  ) {
    reply.status = ApiStatus.ERROR;
    reply.message = "Something went wrong, please try again after sometime";
    reply.entry_by = request.ip || "0.0.0.0";

    return response.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json(reply);
  }

  try {
    apiResponse.facts.map((fact) => {
      bulkOperation.push({
        updateOne: {
          filter: { $and: [{ facts: fact }, { is_deleted: false }] },
          update: { $set: { facts: fact } },
          upsert: true,
        },
      });
    });

    await DogFact.bulkWrite(bulkOperation);
    reply.status = ApiStatus.SUCCESS;
    reply.message = "Dog facts created successfully";
    reply.entry_by = request.ip || "0.0.0.0";

    return response.status(HTTP_STATUS.CREATED).json(reply);
  } catch (error) {
    reply.status = ApiStatus.EXCEPTION;
    reply.message = error.message || "An error occured";
    reply.data = error;
    reply.entry_by = request.ip || "0.0.0.0";

    return response.status(HTTP_STATUS.ERROR).json(reply);
  }
}

async function getAllDogFacts(request, response) {
  const reply = new ApiResponse();
  const page = request.query.page || 1;
  const limit = 10;

  try {
    const facts = await DogFact.find({ is_deleted: false })
      .skip((page - 1) * limit)
      .limit(limit);
    reply.status = ApiStatus.SUCCESS;
    reply.message = "Dog facts fetched successfully";
    reply.data = { count: facts.length, facts };
    reply.entry_by = request.ip || "0.0.0.0";

    return response.status(HTTP_STATUS.OK).json(reply);
  } catch (error) {
    reply.status = ApiStatus.EXCEPTION;
    reply.message = error.message || "An error occured";
    reply.data = error;
    reply.entry_by = request.ip || "0.0.0.0";

    return response.status(HTTP_STATUS.ERROR).json(reply);
  }
}

async function deleteDogFactById(request, response) {
  const reply = new ApiResponse();
  const dogFactId = request.params.id;

  if (!dogFactId) {
    reply.status = ApiStatus.VALIDATION;
    reply.message = "Please provide a valid id";
    reply.entry_by = request.ip || "0.0.0.0";

    return response.status(HTTP_STATUS.BAD_REQ).json(reply);
  }

  try {
    await DogFact.findByIdAndUpdate(dogFactId, { is_deleted: true });
    reply.status = ApiStatus.SUCCESS;
    reply.message = "Dog fact deleted successfully";
    reply.entry_by = request.ip || "0.0.0.0";

    return response.status(HTTP_STATUS.OK).json(reply);
  } catch (error) {
    reply.status = ApiStatus.EXCEPTION;
    reply.message = error.message || "An error occured";
    reply.entry_by = request.ip || "0.0.0.0";

    return response.status(HTTP_STATUS.ERROR).json(reply);
  }
}

module.exports = { createNewDogFact, getAllDogFacts, deleteDogFactById };
