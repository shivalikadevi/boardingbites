const form = document.querySelector("#contact-form");
form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const response = await fetch("/api/messages", {
		method: "POST",
		body: JSON.stringify({
			name: formData.get("name"),
			email: formData.get("email"),
			message: formData.get("message"),
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	alert(result.message);
	form.reset();
});



const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/messages", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const messageSchema = new mongoose.Schema({
	name: String,
	email: String,
	message: String,
});

const Message = mongoose.model("Message", messageSchema);

app.post("/api/messages", async (req, res) => {
	try {
		const message = new Message({
			name: req.body.name,
			email: req.body.email,
			message: req.body.message,
		});
		await message.save();
		res.json({ message: "Message sent successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error occurred, message not sent." });
	}
});

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
