const express = require("express")
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
var items=[];
var workitems=[];

app.get("/", function (req, res) {
    var day=date.getdate()
    res.render("list", { listTitle: day,newListItems:items });
})
app.post("/",function(req,res) {
    console.log(req.body);
    var item=req.body.newItem
    console.log(req.body.list)
    if(req.body.list === "Work list"){
        workitems.push(item);
        res.redirect("/work")
    }
    else{
        items.push(item);
        res.redirect("/")
    }

})


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work list",newListItems:workitems });
})
app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server started on port 3000");
})


