var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
  {
    name: "Granite Hill",
    image: "http://haileyidaho.com/wp-content/uploads/2015/01/Stanley-lake-camping-Credit-Carol-Waller-2011.jpg",
    description: "Too many bugs, disgusting facilities and lots of angry bears. Would camp again."
  },
  function(err, campground){
    if(err){
      console.log(err);
    }else{
      console.log("New campground added via server.");
      console.log(campground);
    }
  });

app.get("/", function(req, res){
  res.render("landing");
});


//RESTful new campground creation

//INDEX - shows all campgrounds currently in DB
app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
       res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

//CREATE - creates new campgrounds and reroutes to INDEX
app.post("/campgrounds", function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  //Create a new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
        console.log(err);
    }else{
      res.redirect("/campgrounds");
    }
  });
});

//SHOW - shows more info about a single campground
app.get("/campgrounds/:id", function(req, res){
  Campground.FindById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("show", {campground: foundCampground})
    }
  });
  req.params.id
  res.render("show");
});

app.listen(3000, "localhost", function(){
  console.log("YelpCamp server is running.")
});
