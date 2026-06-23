const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../model/listing.js");

main()
    .then((res) => {
        console.log("Connected to data base");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/araahi");

};

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
    console.log("data was initialized");
};
initDB();