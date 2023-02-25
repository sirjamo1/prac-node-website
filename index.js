let http = require("http");
let url = require("url");
let fs = require("fs");

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let filename = "";
    if (q.pathname === "/") {
        filename = "./index.html";
    } else if (q.pathname === "/about") {
        filename = "./about.html";
    } else if (q.pathname === "/contact-me") {
        filename = "./contact-me.html";
    } else {
        filename = "./404.html";
    }
    // let filename = q.pathname === "/" ? `./index.html` : `.${q.pathname}.html`;
    // console.debug(q, filename);
    // if (
    //     filename !== './index.html' ||
    //     filename !== './about.html' ||
    //     filename !== './contact-me.html'
    // )
    //   filename = './404.html';

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, {
                "Content-Type": "text/html",
            });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
}).listen(8080);
