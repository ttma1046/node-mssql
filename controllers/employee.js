var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");

exports.getList = function (req, resp) {
    "use strict";
    db.executeSql("SELECT * FROM emp", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);   
        }
    });
};

exports.get = function (req, resp, empno) {
    "use strict";
    db.executeSql("SELECT * FROM emp WHERE empno = " + empno, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);   
        }
    });
};

exports.add = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO emp (empno, ename, sal, deptno) VALUES ";
            sql += util.format("(%d, '%s', %d, %d)", data.Empno, data.Ename, data.Sal, data.Deptno);

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);   
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
};

exports.update = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (data.Empno) throw new Error("Empno no provided");

            var sql = "UPDATE emp SET";

            var isDataProvided = false;

            if (data.Ename) {
                sql += " Ename = '" + data.Ename + "',";    
            }

            if (data.Sal) {
                sql += " Sal = " + data.Sal + ",";    
            }

            if (data.Deptno) {
                sql += " Deptno = " + data.Deptno + ",";
            }

            sql = sql.slice(0, -1);
            sql += " WHERE empno = " + data.Empno; 
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);   
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
};

exports.delete = function (req, resp, reqBody) {
    "use strict";
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (data.Empno) throw new Error("Empno no provided");

            var sql = "DELETE FROM emp";

            sql += " WHERE empno = " + data.Empno; 
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);   
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsg.show500(req, resp, ex);
    }
};