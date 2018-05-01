var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Chris' Camp", image: "https://i.imgur.com/QakLAVj.jpg"},
  {name: "Tent Town", image: "https://i.imgur.com/OFv3gAI.jpg"},
  {name: "Sleep here in a tent, tho.", image: "https://i.imgur.com/7DNBKWj.jpg"}
];


app.get("/", function(req, res){
  res.render("landing");
});


//RESTful new campground creation
app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

app.post("/campgrounds", function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  //redirect back to campgrounds page.
  res.redirect("/campgrounds");
});

app.listen(3000, "localhost", function(){
  console.log("YelpCamp server is running.")
});
