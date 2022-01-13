import chalk from 'chalk';
import { readFileSync } from 'fs';


//check if argument is provided
if(process.argv.length < 3) {
    console.log(chalk.red("please provide path to .txt file"));
    process.kill(process.pid, 'SIGTERM');
}

const pathToTxtFile = process.argv[2];

//check if provided argument contains .txt extension
if(!pathToTxtFile.includes('.txt')) {
    console.log(chalk.red("Argument provided is not a .txt file"));
    process.kill(process.pid, 'SIGTERM')
}

//check argument was provided with forward slash (on windows) --> Explanation: on windows it's converted to "random" absolute path
if(pathToTxtFile.includes('C:/')) {
    console.log(chalk.red("Please do not provide starting forward slash on Windows"));
    process.kill(process.pid, 'SIGTERM');
}

const finalPath = pathToTxtFile[0] === '/' ? pathToTxtFile : '/' + pathToTxtFile;

