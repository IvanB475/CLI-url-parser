import chalk from "chalk";

//using match find FIRST match in the given line and return it's index
export const getIndexOfOpeningBracket = (line) => {
    if(!line) {
        console.log(chalk.red("getIndexOfOpeningBracket requires line to be provided"));
        process.kill(process.pid, 'SIGTERM');
    }
    const openingBracketIndex = line.match(/\[/)?.index;
    return openingBracketIndex;
}

// using matchAll find all closing brackets, and then return index of the last one
export const getIndexOfClosingBracket = (line) => {
    if(!line) {
        console.log(chalk.red("getIndexOfClosingBracket requires line to be provided"));
        process.kill(process.pid, 'SIGTERM');
    }
    const closingBrackets = [...line.matchAll(/\]/g)];
    const closingBracketIndex = closingBrackets[closingBrackets.length - 1]?.index;
    return closingBracketIndex;
}