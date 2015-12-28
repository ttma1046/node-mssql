var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");

http.createServer(function (req, resp) {
	switch (req.method) { 
		case "GET":
			if (req.url === "/") {
				httpMsgs.showHome(req, resp)
			}
			else if (req.url === "/employees") {
				emp.getList(req, resp);
			}
			else {
				var empnoPatt = "[0-9]+";
				var patt = new RegExp("/employees/" + empnoPatt);

				if (patt.test(req.url)) {
					 patt = new RegExp(empnoPatt);

					 var empno = patt.exec(req.url);
					 emp.get(req, resp, empnp);
				}
				else {
					httpMsgs.show404(req)
				}
			}
			break;
		case "POST":
			if (req.url === "/employees") {
				var reqBody = '';
				req.on("data", function(data) {
					reqBody += data;
					if (reqBody.length > 1e7) //10MB
					{
						httpMsgs.show413(req, resp);
					}
				});

				req.on("end", function (req, resp, reqBody) {
					emp.add(req, resp, reqBody)
				});
			}
			else {
				httpMsgs.show404(req, resp);
			}
			break;
		case "PUT":
			if (req.url === "/employees") {
				var reqBody = '';
				req.on("data", function(data) {
					reqBody += data;
					if (reqBody.length > 1e7) //10MB
					{
						httpMsgs.show413(req, resp);
					}
				});

				req.on("end", function (req, resp, reqBody) {
					emp.update(req, resp, reqBody)
				});
			}
			else {
				httpMsgs.show404(req, resp);
			}
			break;
		case "DELETE":
			if (req.url === "/employees") {
				var reqBody = '';
				req.on("data", function(data) {
					reqBody += data;
					if (reqBody.length > 1e7) //10MB
					{
						httpMsgs.show413(req, resp);
					}
				});

				req.on("end", function (req, resp, reqBody) {
					emp.delete(req, resp, reqBody)
				});
			}
			else {
				httpMsgs.show404(req, resp);
			}
			break;
		default:
			break;
	}
}).listen(settings.webPort, function () {
	console.log("Started listening at: " + settings.webPort);
});