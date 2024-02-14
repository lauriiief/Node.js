import { EventEmitter } from "events";

function createNewsFeed() {
  const emitter = new EventEmitter();

  emitter.on("newsEvent", (data) => {
    console.log(`News Event: ${data}`);
  });

  emitter.on("breakingNews", (data) => {
    console.log(`Breaking News: ${data}`);
  });

  emitter.on("error", (data) => {
    console.log(`Error: ${data}`);
  });

  setInterval(() => {
    emitter.emit("newsEvent", "News: A thing happened in a place.");
  }, 1000);

  setInterval(() => {
    emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
  }, 4000);

  setTimeout(() => {
    emitter.emit("error", new Error("News feed connection error"));
  }, 5000);

  return emitter;
}

createNewsFeed()