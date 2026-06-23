const { match } = require('assert');
const mongoose = require('mongoose');
const { describe } = require('node:test');
const { type } = require('os');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      set: (v) => v === "" ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" : v,
    },
  },
  price: {
    type: Number,
    min: 100,
  },
  location: String,
  country:{
    type: String,
    match: [/^[A-Za-z\s]+$/, "Country name must contain only letters"],
  },
  state:{
    type: String,
    match:[/^[A-Za-z\s]+$/, "State name must contain only letters"],
  },
  city:{
    type: String,
    match:[/^[A-Za-z\s]+$/, "City name must contain only letters"],
  },
  zip: Number,
  about: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;