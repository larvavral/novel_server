var fs = require("fs");

function getNovelList(response, request, segments) {
    console.log("Request handler 'getNovelList' was called.");

    fs.readFile("./data/novels_list.json", function(err, file) {
        if (err) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(err + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(file);
            response.end();
        }
    });
}

function getNovel(response, request, segments) {
    console.log("Request handler 'getNovel' was called.");

    if (segments.length < 2 || segments.length > 3) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ error: "Invalid url" }));
        response.end();
        return;
    }

    var filename = "./data/chapters/" + segments[1] + ".json";
    fs.readFile(filename, function(err, file) {
        if (err) {
            response.writeHead(500, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ error: err }));
            response.end();
            return;
        } else {
            var chapter_list = JSON.parse(file);
            var chapter_title_list = [];
            index = 0;

            if (segments.length == 2) {
                response.writeHead(200, { "Content-Type": "application/json" });
                for (var chapter of chapter_list) {
                    index++;
                    chapter_title_list.push({ index: index, title: chapter.title, path: chapter.path });
                }
                response.write(JSON.stringify(chapter_title_list));
                response.end();
            } else {
                var found = false;

                for (var chapter of chapter_list) {
                    var incoming_path = "/" + segments[1] + "/" + segments[2] + "/";
                    if (chapter.path === incoming_path) {
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.write(JSON.stringify(chapter));
                        response.end();
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.write(JSON.stringify({ error: "Invalid url" }));
                    response.end();
                }
            }
        }
    });
}

exports.getNovelList = getNovelList;
exports.getNovel = getNovel;