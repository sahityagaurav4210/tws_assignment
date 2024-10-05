const mongoose = require("mongoose");

async function connectDatabase(dburl) {
  await mongoose.connect(dburl);
}

module.exports = { connectDatabase };
