const express = require('express');
const app = express();
let port = 8080;

const mongoose = require('mongoose');
const Listing = require("./model/listing.js");
const User = require("./model/user.js");
const wrapAsync = require("./util/wrapAsync.js");
const ExpressError = require("./util/ExpressError.js");
const {listingSchema} = require("./schema.js");
main()
    .then((res) => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/araahi');
};

const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

{ //Home page and login page
app.get("/", (req, res) => {
    res.send("Hey I am root!");
});
}

{//Index Page and all

const listingSchema = require("./schema.js");

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

//Index Route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}));

//Create route
app.post("/listings",validateListing, wrapAsync(async (req, res, next) => {
    // let {title, description, image, price, location, country} = req.body; ///ye bhi kr skte the agar humne new.ejs mei form ke andar name = "listing[xyz]" na kia hota toh"
    // let listing = req.body.listing;
    // new Listing (listing);
    // console.log(listing);

    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send valid data for listing");
    // };

    
    const newListing = new Listing(req.body.listing);
    /*if(!newListing.description){throw new ExpressError(400, "Desscription is missing");};
    if(!newListing.price){throw new ExpressError(400, "price is missing");};
    if(!newListing.title){throw new ExpressError(400, "title is missing");};
    if(!newListing.country){throw new ExpressError(400, "country name is missing");};
    if(!newListing.state){throw new ExpressError(400, "state name is missing");};
    if(!newListing.city){throw new ExpressError(400, "city name is missing");};
    if(!newListing.zip){throw new ExpressError(400, "zip code is missing");};
    if(!newListing.location){throw new ExpressError(400, "location is missing");}; 
    too bulky and in case of more number of model this will not be suitable*/
    //we will use joi instead of this


    await newListing.save();
    res.redirect("/listings");
}));


//edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
}));

app.patch("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    if(!req.body.listing){
        throw new ExpressError(400, "send valid data for listing");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing },{ runValidators: true });
    res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));
}


app.use((req,res,next)=>{
    next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
    let{statusCode = 500, message = "Something went wrong"} = err;
    console.log(err);
    res.status(statusCode).render("error.ejs",{err});
    //res.status(statusCode).send(message);
});

app.listen(port, (req, res) => {
    console.log(`app is listening to port ${port}`);
});