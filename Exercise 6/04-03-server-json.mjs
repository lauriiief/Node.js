import { createServer } from "node:http";
import info from './04-03-json-example.json' assert { type: 'json' };

const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "application/json");

  const jsonResponseBody = JSON.stringify(info);

  response.end(jsonResponseBody);
});

server.listen(3001, () => {
  console.log(`Server running at http://localhost:3001`);
});
