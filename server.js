const http = require("http");
const fs = require("fs");
const path = require("path");

const myServer = http.createServer((req, res) => {
    console.log("New request received:", req.method, req.url);

    // Handling favicon request
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        return;
    }

    // Logging the request
    const log = `${req.method} : ${req.url} New Request received \n`;
    fs.appendFile("log.txt", log, (err, data) => {
        if (err) {
            console.error("Error writing to log file:", err);
            return;
        }
        console.log("Request logged successfully.");
    });

    // Handling other types of requests
    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/':
                    // Serve the HTML form
                    const filePath = path.join(__dirname, 'index.html');
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            console.error("Error reading HTML file:", err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end("Internal Server Error");
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    });
                    break;
                case '/about':
                  const filePath2 = path.join(__dirname, 'get.html');
                    fs.readFile(filePath2, (err, data) => {
                        if (err) {
                            console.error("Error reading HTML file:", err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end("Internal Server Error");
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("I'm Vishu Patle ");
                    });
                    break;
                    
                  
                default:
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end("404 Not Found");
            }
            break;
        case 'POST':
            if (req.url === '/submit-form') {
                let formData = '';
                
                req.on('data', (chunk) => {
                    formData += chunk.toString(); // Convert the buffer to a string
                });
                
                req.on('end', () => {
                    // Parse the form data into JSON format
                    const jsonData = JSON.parse(formData);
                    
                    // Log the form data
                    console.log('Form data received:', jsonData);
                    
                    // Send the JSON data in the response
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(jsonData));
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("404 Not Found");
            }
            break;
        case 'HEAD':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end();
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end("Method Not Allowed");
            break;
    }
});

myServer.listen(8000, () => console.log("Server Started!"));
