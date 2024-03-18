import EventEmitter from "./EventEmitter.js";
import fetch from "node-fetch";

export default class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit("begin");
    const startTime = process.hrtime.bigint();

    asyncFunc(...args, (err, data) => {
      if (err) {
        return console.error("Error: ", err);
      }
      const diff = process.hrtime.bigint() - startTime;

      this.emit("data", data);
      this.emit("end");
      console.log(`Execution time: ${diff} nanoseconds`);
    });
  }
}

const fetchFromUrl = (url, cb) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => cb(null, data))
    .catch((err) => cb(err));
};

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));
withTime.on("data", (data) => console.log("Data: ", data));

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));
