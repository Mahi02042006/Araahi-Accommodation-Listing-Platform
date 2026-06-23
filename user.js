const { match } = require('assert');
const mongoose = require('mongoose');
const { describe } = require('node:test');
const { type } = require('os');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    s_name: {
        type: String,
        match: [/^[A-Za-z\s]+$/, "Name must contain only letters"],
    },
    m_name: {
        type: String,
         match: [/^[A-Za-z\s]+$/, "Name must contain only letters"],
    },
    l_name: {
        type: String,
         match: [/^[A-Za-z\s]+$/, "Name must contain only letters"],
    },
    address: String,
    contact: {
        type: Number,
        minlength: 12,
        maxlength: 12,
        match: [/^[0-9]+$/, "Contact must contain only digits"],
    },
    username: String,
    userid : String,
    password: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;