const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = 8080;
const messageList = [];
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/app.html");
});
io.on("connection", function (socket) {
	console.log("server connected");
	socket.on("user login", function (req) {
		console.log("req: " + JSON.stringify(req.userInfo));
		messageList.unshift(JSON.stringify(req.userInfo) + " 已连接!");
		socket.emit("user login", { msgList: messageList });
	});
	socket.on("chat message", function (msg) {
		console.log("message: " + msg);
		messageList.unshift(msg);
		socket.emit("client message", { msgList: messageList });
	});
});
http.listen(port, function () {
	console.log("listening on *:" + port);
});
