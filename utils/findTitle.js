
//function that searches for title in provided string
export const findTitle = async (htmlBody) => {
    if(!htmlBody){
        console.errorchalk.red("findTitle requires htmlBody to be provided");
        process.kill(process.pid, 'SIGTERM');
    }

    const foundTitle = htmlBody.match(/<title[^>]*>([^<]+)<\/title>/);
    const title = foundTitle ? foundTitle[1] : undefined;
    return title;
}