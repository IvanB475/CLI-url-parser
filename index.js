import * as fs from "fs";
import * as readline from "readline";
import { makeRequests } from "./utils/httpRequest.js";
import { validateBrackets } from "./utils/verifyLineInput.js";
import dotenv from 'dotenv';
import { getUrl } from "./utils/getUrl.js";
dotenv.config();

//check if argument is provided
if (process.argv.length < 3) {
  console.error("please provide path to .txt file");
  process.kill(process.pid, "SIGTERM");
}

const pathToTxtFile = process.argv[2];

//check if provided argument contains .txt extension
if (!pathToTxtFile.includes(".txt")) {
  console.error("Argument provided is not a .txt file");
  process.kill(process.pid, "SIGTERM");
}

//check argument was provided with forward slash (on windows) --> Explanation: on windows it's converted to "random" absolute path
if (pathToTxtFile.includes("C:/")) {
  console.error("Please do not provide starting forward slash on Windows without a dot");
  process.kill(process.pid, "SIGTERM");
}

const pathWithForwardSlash = pathToTxtFile[0] === "/" || pathToTxtFile[1] === "/"
    ? pathToTxtFile : "/" + pathToTxtFile;
const relativePathToTxtFile = pathWithForwardSlash[0] === "."
    ? pathWithForwardSlash : "." + pathWithForwardSlash;

const fileToStream = fs.createReadStream(relativePathToTxtFile);

const rl = readline.createInterface(fileToStream);

let lineCounter = 0;

const urlsToMakeRequestTo = [];

for await(const line of rl) {
  lineCounter++;
  if (!validateBrackets(line)) {
    console.error(`Wrong input on line ${lineCounter}, every opened bracket has to be closed.`);
  } else {
    const urlToMakeRequestTo = await getUrl(line);
    if(urlToMakeRequestTo && !urlsToMakeRequestTo.includes(urlToMakeRequestTo)) {
    urlsToMakeRequestTo.push(urlToMakeRequestTo);
    }
  }
}

await makeRequests(urlsToMakeRequestTo);