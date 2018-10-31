var requestHandlers = require("./requestHandlers");

function route(handle, pathname, response, request) {
    console.log("Route a request for " + pathname);
    var segments = pathname.replace(/^\//, "").split('/');

    if (segments.length > 0 && typeof handle[segments[0]] === 'function') {
        return handle[segments[0]](response, request, segments);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;