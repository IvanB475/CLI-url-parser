import { isValidUrl } from "../utils/validateUrl";


test('expects a valid url', async () => {
    const testUrl = 'www.google.com';
    const isValid = isValidUrl(testUrl);
    if(!isValid){
        throw new Error('Expected an valid url but did not find one')
    }
})