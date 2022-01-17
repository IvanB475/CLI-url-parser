import { hashEmail } from "../utils/hashEmail.js"


test('return email hash', async () => {
    const email = 'testrandomemail@test.com';
    const hashedEmail = await hashEmail(email);
    if(!hashedEmail) {
        throw new Error('did not return a hashed email');
    }
})