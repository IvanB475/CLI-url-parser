import chalk from "chalk";
import * as fs from "fs";
import * as readline from "readline";
import * as url from "url";
import { isValidURL } from "./utils/validateUrl.js";
import { validateBrackets } from "./utils/verifyLineInput.js";

//check if argument is provided
if (process.argv.length < 3) {
  console.log(chalk.red("please provide path to .txt file"));
  process.kill(process.pid, "SIGTERM");
}

const pathToTxtFile = process.argv[2];

//check if provided argument contains .txt extension
if (!pathToTxtFile.includes(".txt")) {
  console.log(chalk.red("Argument provided is not a .txt file"));
  process.kill(process.pid, "SIGTERM");
}

//check argument was provided with forward slash (on windows) --> Explanation: on windows it's converted to "random" absolute path
if (pathToTxtFile.includes("C:/")) {
  console.log(
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
rl.on("line", (line) => {
  lineCounter++;
  if (!validateBrackets(line)) {
    console.log(
      chalk.red(
        `Wrong input on line ${lineCounter}, every opened bracket has to be closed.`
      )
    );
    //    process.kill(process.pid, 'SIGTERM');
  } else {
    const arrOfStrings = line.split(" ");
    const urls = arrOfStrings.map((url, index) => {
      if (isValidURL(url)) return url;
    });

    const filteredUrls = urls?.filter((url) => url);
    console.log(filteredUrls);
    // const uniqueUrls = [...new Set(filteredUrls)];
  }
});
