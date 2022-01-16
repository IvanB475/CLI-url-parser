import chalk from "chalk";

// using matchAll find all opening brackets, and then return index of the first one that was not escaped
export const getIndexOfOpeningBracket = (line) => {
    if(!line) {
        console.log(chalk.red("getIndexOfOpeningBracket requires line to be provided"));
        process.kill(process.pid, 'SIGTERM');
    }
    const openingBrackets = [...line.matchAll(/\[/g)];
    let openingBracketIndex;
    let numberOfEscapedBrackets = 0; 
    for (let bracket of openingBrackets) {
        const bracketIndex = bracket.index;
        if(line[(bracketIndex - 1)] !== '\\') {
            openingBracketIndex = bracketIndex;
            break;
        }
        numberOfEscapedBrackets++;
    }
    const numberOfBracketsToEscape = numberOfEscapedBrackets + 1;
    const closingBracketIndex = getIndexOfClosingBracket(line, numberOfBracketsToEscape)
    return {openingBracketIndex, closingBracketIndex};
}


// using matchAll find all closing brackets, and then return index of specified one
export const getIndexOfClosingBracket = (line, numberOfEscapedBrackets) => {
    if(!line) {
        console.log(chalk.red("getIndexOfClosingBracket requires line to be provided"));
        process.kill(process.pid, 'SIGTERM');
    }
    const closingBrackets = [...line.matchAll(/\]/g)];
    const closingBracketIndex = closingBrackets[numberOfEscapedBrackets]?.index;
    return closingBracketIndex;
}