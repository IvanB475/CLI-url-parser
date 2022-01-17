import chalk from "chalk";
import axios from "axios";


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