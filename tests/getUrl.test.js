import { getUrl } from "../utils/getUrl.js"


test('returns an url', async () => {
    const testString = 'this string contains an url within square brackets [ www.google.com ]'
    const url = await getUrl(testString);
    if(!url){
        throw new Error('Did not find an url');
    }
})

test('does not find an url that is not within the square brackets', async () => {
    const testString = 'this string contains an url without brackets www.google.com'
    const url = await getUrl(testString);
    if(url){
        throw new Error(url);
    }
})


test('does not find false urls within square brackets', async () => {
    const testString = 'this string contains square brackets without url [ random test within brackets ]'
    const url = await getUrl(testString);
    if(url){
        throw new Error('Found an url');
    }
})