var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["novel-list"] = requestHandlers.getNovelList;
handle["novel"] = requestHandlers.getNovel;

server.start(router.route, handle);