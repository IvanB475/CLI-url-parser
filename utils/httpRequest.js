import chalk from "chalk";
import axios from "axios";
import { hashEmail } from "./hashEmail.js";
import { findEmail } from "./findEmail.js";
import { findTitle } from "./findTitle.js";
import { sleep } from "./sleep.js";


// function that makes http get request to provided url
export const makeRequestToUrl = async (urlToMakeRequestTo) => {
    if(!urlToMakeRequestTo){
        console.error(chalk.red("makeRequestToUrl requires urlToMakeRequestTo to be provided"));
        process.kill(process.pid, 'SIGTERM');
    }
    const urlConvertedToHttps = `https://${urlToMakeRequestTo}`;

    try {
        const responseFromUrl = await axios.get(urlConvertedToHttps, {});
        const urlResponseBody = responseFromUrl?.data;
        return urlResponseBody;
    } catch(e) {
       return false;
    }
}

// function that makes requests to every url in the array
export const makeRequests = async (urlsToMakeRequestTo) => {
    for await(const urlToMakeRequestTo of urlsToMakeRequestTo) {
        try {
        let urlResponseBody = await makeRequestToUrl(urlToMakeRequestTo);
        if(!urlResponseBody){
          await sleep(6000);
          urlResponseBody = await makeRequestToUrl(urlToMakeRequestTo);
          if(!urlResponseBody) {
            console.error(chalk.red(`Both requests to ${urlToMakeRequestTo} have failed`));
          }
        }
    
        if(urlResponseBody) {
        const htmlBody = urlResponseBody || 'Basic text';
        const title = findTitle(htmlBody) || undefined;
        const email = findEmail(htmlBody) || undefined;
        const responseObject = { url: urlToMakeRequestTo, title}
        if(email) {
          const hashedEmail = hashEmail(email);
          responseObject.email = hashedEmail;
        }
    
        const jsonResponse = JSON.stringify(responseObject);
        process.stdout.write(jsonResponse + '\n');
        await sleep(1000);
        }
        } catch(e) {
            const errMessage = e.message || 'something went wrong';
            console.log(chalk.red(errMessage));
    
        }
    }
}