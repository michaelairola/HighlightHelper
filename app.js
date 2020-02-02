const express = require("express");
const path = require("path");
const sendMail = require("./mail.js");

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;
const app = express();

app.get("/widget.js", (req, res) => res.sendFile(path.join(`${__dirname}/dist/widget.js`)))

let onlySendOnce = false
app.get("/send", (req, res) => {
	if(onlySendOnce) {
		res.send("You have already sent successfully! no more for now.");
		return
	} else {
		onlySendOnce = true
	}
	sendMail("mik3airola@gmail.com").then(()=> {
		res.send("Yay!")
	}).catch(e => {
		console.warn(e)
		res.send("Boo!");
	})
})

app.use(express.static("public"))
app.listen(PORT, ()=>{ 
	console.log(`listening on port ${PORT}`)
})