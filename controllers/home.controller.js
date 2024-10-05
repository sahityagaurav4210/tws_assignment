const { HTTP_STATUS, ApiResponse, ApiStatus } = require("../api");

async function ping(request, response) {
  const reply = new ApiResponse(
    ApiStatus.SUCCESS,
    "Pong",
    {},
    request.ip || "0.0.0.0"
  );
  return response.status(HTTP_STATUS.OK).json(reply);
}

module.exports = { ping };
