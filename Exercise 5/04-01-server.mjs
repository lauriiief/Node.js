import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "text/html");

  response.end(
    "<html><body><h1>This page was served with Node.js!</h1><p>Keep track of our responses</p></body></html>"
  );
});

server.listen(3001, () => {
  console.log(`Server running at http://localhost:3001`);
});
