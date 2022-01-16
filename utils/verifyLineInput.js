//validates if the count of open brackets and closed brackets is the same within the line
export const validateBrackets = (line) => {
    const countOpenBrackets = line.match(/\[/g)?.length;
    const countClosedBrackets = line.match(/\]/g)?.length;
    if(countOpenBrackets !== countClosedBrackets) return false;
    return true;
}