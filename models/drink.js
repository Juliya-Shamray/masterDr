const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const alcoholicList = ["Alcoholic", "Non alcoholic"];

const drinkSchema = new Schema(
  {
    drink: {
      type: String,
      required: true,
    },
    drinkAlternate: {
      type: String,
      default: "Sorry, not specified",
    },
    tags: {
      type: String,
      default: "Sorry, not specified",
    },
    video: {
      type: String,
      default: "Sorry, not specified",
    },
    category: {
      type: String,
      required: true,
    },
    IBA: {
      type: String,
      default: "Sorry, not specified",
    },
    alcoholic: {
      type: String,
      enum: alcoholicList,
    },
    glass: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    instructionsES: String,
    instructionsDE: String,
    instructionsFR: String,
    instructionsIT: String,
    instructionsRU: String,
    instructionsPL: String,
    instructionsUK: String,
    drinkThumb: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "ingredient",
        },
        measure: String,
      },
    ],

    shortDescription: String,
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const addSchema = Joi.object({
  drink: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  alcoholic: Joi.string()
    .required()
    .valid(...alcoholicList),
  glass: Joi.string().required(),
  instructions: Joi.string().required(),
  drinkThumb: Joi.any().required(),
  ingredients: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      measure: Joi.string().required(),
    })
  ),
  favorite: Joi.boolean(),
});

const removeSchema = Joi.object({
  id: Joi.string().required(),
});

const schema = {
  addSchema,
  removeSchema,
};

drinkSchema.post("save", handleMongooseError);

const Drink = model("drink", drinkSchema);

module.exports = { Drink, schema };
