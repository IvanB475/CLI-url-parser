import { findEmail } from "../utils/findEmail.js"

test('finds an email', async () => {
    const testString = 'This is a random string that contains an email. This is a random email testatrandom@gmail.com';
    const email = await findEmail(testString);
    if(!email) {
        throw new Error(`didn't find an email`);
    }
})

test('does not find an email', async () => {
    const testString = 'This is a random string that does not contain an email.';
    const email = await findEmail(testString);
    if(email) {
        throw new Error(`found an email`);
    }
})