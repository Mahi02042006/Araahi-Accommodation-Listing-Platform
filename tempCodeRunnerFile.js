const mongoose = require("mongoose");
const data = require("./userdata.js");
const User = require("../model/user.js");
const wrapAsync = require("./util/wrapAsync.js");

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

const initDB = wrapAsync(async () => {
    await User.deleteMany({});
    await User.insertMany(data.data);
    console.log("data was initialized");
});
initDB();