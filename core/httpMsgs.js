var settings = require("../settings");

exports.showHome = 
exports.show500 = function (req, resp, err) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(500, "Internal Error occurred", {"Content-Type": "text/html"});
        resp.write("<html><head><title>500</title></head><body>500: Internal Error, Details: " + err + "</body></html>");
    }
    else {
        resp.writeHead(500, "Internal Error occurred", {"Content-Type": "application/json"});
        resp.write(JSON.stringify({data: "ERROR occurred: " + err }));
    }

    resp.end();
};

exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, {"Content-Type": "application/json"});
    if (data) {
    	resp.write(JSON.stringify(data));
    }
    resp.end();  
};

exports.show405 = function (req, resp) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(405, "Method Not Allowed", {"Content-Type": "text/html"});
        resp.write("<html><head><title>405</title></head><body>405: Method Not Allowed</body></html>");
    }
    else {
        resp.writeHead(405, "Method Not Allowed", {"Content-Type": "application/json"});
        resp.write(JSON.stringify({data: "Method Not Allowed"}));
    }

    resp.end();
};

exports.show404 = function (req, resp) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(404, "Resource Not Found", {"Content-Type": "text/html"});
        resp.write("<html><head><title>404</title></head><body>404: Resource Not Found</body></html>");
    }
    else {
        resp.writeHead(404, "Resource Not Found", {"Content-Type": "application/json"});
        resp.write(JSON.stringify({data: "Resource Not Found"}));
    }

    resp.end();
};

exports.show413 = function (req, resp) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(413, "Request Entity Too Large", {"Content-Type": "text/html"});
        resp.write("<html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>");
    }
    else {
        resp.writeHead(413, "Request Entity Too Large", {"Content-Type": "application/json"});
        resp.write(JSON.stringify({data: "Request Entity Too Large"}));
    }

    resp.end();
};

exports.showHome = function (req, resp) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(200, {"Content-Type": "text/html"});
        resp.write("<html><head><title>Home</title></head><body>End Point</body></html>");
    }
    else {
        resp.writeHead(200, {"Content-Type": "application/json"});
        resp.write(JSON.stringify([
        	{url: "/employees", operations: "GET", description: "To List All Employees"},
        	{url: "/employees/<empno>", operations: "GET", description: "To search for an employee"}
        	]));
        }
    }

    resp.end();
};