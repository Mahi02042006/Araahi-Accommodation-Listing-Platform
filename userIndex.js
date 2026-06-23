const mongoose = require("mongoose");
const data = require("./userdata.js");
const User = require("../model/user.js");

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
    try{
        await User.deleteMany({});
    await User.insertMany(data.data);
    console.log("data was initialized");
    } catch(err){
        console.error("insert Error");
        console.error(err);
    };
};
initDB();