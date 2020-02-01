const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;
const app = express();

app.get("/widget.js", (req, res) => res.sendFile(path.join(`${__dirname}/dist/widget.js`)))
app.use(express.static("public"))

app.listen(PORT, ()=>{ 
	console.log(`listening on port ${PORT}`)
})