const express = require("express");
const fs = require("fs");
const Mustache = require("mustache");

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;
const app = express();

app.set("views", "./dist")
app.set("view engine", "js")
app.engine('js', function (filePath, { DEV_MODE, ID }, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    var rendered = Mustache.render(content.toString(),{ DEV_MODE, ID });
    return callback(null, rendered)
  })
})
app.get(/\/widget-*(.*)\.js/, function (req, res) {
  res.contentType("application/javascript")
  const ID = req.params[0] || "";
  res.render("widget.js", { DEV_MODE, ID })
})
app.use(express.static("public"))
app.use("public/", express.static("public"))

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))