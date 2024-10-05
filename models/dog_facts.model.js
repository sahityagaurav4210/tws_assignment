const { Schema, model } = require("mongoose");

const dogFactsSchema = new Schema(
  {
    facts: {
      type: String,
      required: [true, "Facts are required"],
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const DogFact = model("dog_facts", dogFactsSchema);

module.exports = DogFact;
