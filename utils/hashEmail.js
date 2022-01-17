import chalk from 'chalk';
import * as crypto from 'crypto';


// function that hashes email and returns hashed value
export const hashEmail = (email) => {
    if(!email){
        console.error(chalk.red("hashEmail requires email to be provided"));
        process.kill(process.pid, 'SIGTERM');
    }
    const hashingSecret = process.env.HASHING_SECRET_EMAILS;
    const hashedEmail = crypto.createHmac('sha256', hashingSecret).update(email).digest('base64');
    return hashedEmail;
}