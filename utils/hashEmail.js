import * as crypto from 'crypto';


// function that hashes email and returns hashed value
export const hashEmail = async (email) => {
    if(!email){
        console.error("hashEmail requires email to be provided");
        process.kill(process.pid, 'SIGTERM');
    }
    const hashingSecret = process.env.HASHING_SECRET_EMAILS || 'DEFAULT_VALUE';
    const hashedEmail = crypto.createHmac('sha256', hashingSecret).update(email).digest('base64');
    return hashedEmail;
}