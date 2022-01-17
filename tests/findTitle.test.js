import { findTitle } from "../utils/findTitle.js";

test('finds a title', async () => {
    const testString = 'This is a string within which title should be found <title>The title</title>';
    const title = await findTitle(testString);
    if(!title) {
        throw new Error('Did not find a title');
    }
})