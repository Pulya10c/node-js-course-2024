import fs from "fs";
import csv from "csvtojson";

const inputFile = "./csv/input.csv";
const outputFile = "./output.txt";

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

readStream
  .on("error", (err) => {
    console.error("Error during reading file:", err);
  })
  .pipe(csv())
  .on("error", (err) => {
    console.error("Error during conversion to JSON:", err);
  })
  .pipe(writeStream)
  .on("error", (err) => {
    console.error("Error during writing file:", err);
  })
  .on("finish", () => {
    console.log("End of stream reached, done.");
  });
