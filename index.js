import chalk from "chalk";
import * as fs from "fs";
import * as readline from "readline";
import { findEmail } from "./utils/findEmail.js";
import { findTitle } from "./utils/findTitle.js";
import { hashEmail } from "./utils/hashEmail.js";
import { makeRequestToUrl } from "./utils/httpRequest.js";
import { getIndexOfOpeningBracket } from "./utils/indexOfBrackets.js";
import { isValidUrl } from "./utils/validateUrl.js";
import { validateBrackets } from "./utils/verifyLineInput.js";
import dotenv from 'dotenv';
import { sleep } from "./utils/sleep.js";
dotenv.config();

//check if argument is provided
if (process.argv.length < 3) {
  console.error(chalk.red("please provide path to .txt file"));
  process.kill(process.pid, "SIGTERM");
}

const pathToTxtFile = process.argv[2];

//check if provided argument contains .txt extension
if (!pathToTxtFile.includes(".txt")) {
  console.error(chalk.red("Argument provided is not a .txt file"));
  process.kill(process.pid, "SIGTERM");
}

//check argument was provided with forward slash (on windows) --> Explanation: on windows it's converted to "random" absolute path
if (pathToTxtFile.includes("C:/")) {
  console.error(
    chalk.red(
      "Please do not provide starting forward slash on Windows without a dot"
    )
  );
  process.kill(process.pid, "SIGTERM");
}

const pathWithForwardSlash =
  pathToTxtFile[0] === "/" || pathToTxtFile[1] === "/"
    ? pathToTxtFile
    : "/" + pathToTxtFile;
const relativePathToTxtFile =
  pathWithForwardSlash[0] === "."
    ? pathWithForwardSlash
    : "." + pathWithForwardSlash;

const fileToStream = fs.createReadStream(relativePathToTxtFile);

const rl = readline.createInterface(fileToStream);
let lineCounter = 0;

const urlsToMakeRequestTo = [];
for await(const line of rl) {
  lineCounter++;
  if (!validateBrackets(line)) {
    console.error(chalk.red(`Wrong input on line ${lineCounter}, every opened bracket has to be closed.`));
  } else {
    const {openingBracketIndex, closingBracketIndex} = getIndexOfOpeningBracket(line);
    const inputWithinBrackets = line.substring(openingBracketIndex + 1, closingBracketIndex);
    const arrOfStrings = inputWithinBrackets.split(" ");
    const urls = arrOfStrings.map((url) => {
      if (isValidUrl(url)) return url;
    });

    const filteredUrls = urls?.filter((url) => url);
    const urlToMakeRequestTo = filteredUrls[filteredUrls.length - 1];
    if(!urlsToMakeRequestTo.includes(urlToMakeRequestTo)) {
    urlsToMakeRequestTo.push(urlToMakeRequestTo);
    }
  }
}

for await(const urlToMakeRequestTo of urlsToMakeRequestTo) {
    try {
    let urlResponseBody = await makeRequestToUrl(urlToMakeRequestTo);
    if(!urlResponseBody){
      await sleep(60000);
      urlResponseBody = await makeRequestToUrl(urlToMakeRequestTo);
      if(!urlResponseBody) {
        console.error(chalk.red(`Both requests to ${urlToMakeRequestTo} have failed`));
      }
    }

    if(urlResponseBody) {
    const htmlBody = urlResponseBody || 'Basic text';
    const title = findTitle(htmlBody) || undefined;
    const email = findEmail(htmlBody) || undefined;
    const responseObject = { url: urlToMakeRequestTo, title}
    if(email) {
      const hashedEmail = hashEmail(email);
      responseObject.email = hashedEmail;
    }

    const jsonResponse = JSON.stringify(responseObject);
    process.stdout.write(jsonResponse + '\n');
    await sleep(1000);
    }
    } catch(e) {
        const errMessage = e.message || 'something went wrong';
        console.log(chalk.red(errMessage));

    }
}