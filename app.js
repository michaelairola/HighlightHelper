const express = require("express");
const path = require("path");
const sendMail = require("./mail.js");

const captchaFieldName = 'captcha'
const session = require('express-session')
const bodyParser = require('body-parser')

const captcha = require('captcha').create({ 
	cookie: captchaFieldName,
	background: '#fff'
})

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;
const app = express();

app.get("/widget.js", (req, res) => res.sendFile(path.join(`${__dirname}/dist/widget.js`)))

app.use(session({
    secret: 'Hightlight Helper',
    resave: false,
    saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/captcha.jpg", captcha.image()) 
app.post("/send", (req, res) => {
	const isValid = captcha.check(req, req.body[captchaFieldName])
	if(isValid) {
		sendMail("mik3airola@gmail.com").then(()=> {
			res.send("Yay!")
		}).catch(e => {
			console.warn(e)
			res.send("Boo!");
		})
	} else {
		res.send('failure :(');
	}
})

app.use(express.static("public"))
app.listen(PORT, ()=>{ 
	console.log(`listening on port ${PORT}`)
})