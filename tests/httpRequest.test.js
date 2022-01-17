import { makeRequestToUrl } from "../utils/httpRequest";

test('Returns the html body', async() => {
    const testUrl = 'www.google.com';
    const responseBody = makeRequestToUrl(testUrl);
    if(!responseBody) {
        throw new Error('Html body was not returned but was expected')
    }
})
