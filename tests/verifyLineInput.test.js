import { validateBrackets } from "../utils/verifyLineInput"


test('expects line input to be valid', async () => {
    const testString = 'valid line input [ ]'
    const isValid = validateBrackets(testString);
    if(!isValid){
        throw new Error('returned false but expected it to return true')
    }
})


test('expects line input to be invalid', async () => {
    const testString = 'valid line input [ '
    const isValid = validateBrackets(testString);
    if(isValid){
        throw new Error('returned true but expected it to return false')
    }
})