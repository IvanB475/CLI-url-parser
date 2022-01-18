
//function that searches for title in provided string
export const findTitle = async (htmlBody) => {
    if(!htmlBody){
        console.error("findTitle requires htmlBody to be provided");
        process.kill(process.pid, 'SIGTERM');
    }
    const titleRegex = /<title[^>]*>([^<]+)<\/title>/;
    const foundTitle = htmlBody.match(titleRegex);
    const title = foundTitle ? foundTitle[1] : undefined;
    return title;
}