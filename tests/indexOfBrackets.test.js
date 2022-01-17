import { getIndexOfOpeningBracket } from "../utils/indexOfBrackets";


test('retrieves index of opening and closing brackets', async () => {
    const testString = 'this is a test string with [ and ] brackets';
    const {openingBracketIndex, closingBracketIndex} = await getIndexOfOpeningBracket(testString);
    if(openingBracketIndex === undefined || closingBracketIndex === undefined) {
        throw new Error('did not find closing brackets');
    }
}) 


test('returns undefined when no brackets are provided', async () => {
    const testString = 'this is a test string without brackets';
    const {openingBracketIndex, closingBracketIndex} = await getIndexOfOpeningBracket(testString);
    if(openingBracketIndex || closingBracketIndex) {
        throw new Error('found brackets but was expecting not to find them');
    }
})