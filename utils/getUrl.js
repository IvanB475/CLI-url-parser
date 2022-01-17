import { getIndexOfOpeningBracket } from "./indexOfBrackets.js";
import { isValidUrl } from "./validateUrl.js";


export const getUrl = async (line) => {
    const {openingBracketIndex, closingBracketIndex} = getIndexOfOpeningBracket(line);
    if(openingBracketIndex === undefined || closingBracketIndex === undefined) {
        return false;
    }
    const inputWithinBrackets = line.substring(openingBracketIndex + 1, closingBracketIndex);
    const arrOfStrings = inputWithinBrackets.split(" ");
    const urls = arrOfStrings.map((url) => {
      if (isValidUrl(url)) return url;
    });

    const filteredUrls = urls?.filter((url) => url);
    const urlToMakeRequestTo = filteredUrls[filteredUrls.length - 1];
    return urlToMakeRequestTo;
}