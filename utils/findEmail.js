

//helper function that searches for the first email within provided string
export const findEmail = async (htmlBody) => {
  if (!htmlBody) {
    console.error("findEmail requires htmlBody to be provided");
    process.kill(process.pid, "SIGTERM");
  }
  const emailRegex = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;
  const foundEmail = htmlBody.match(emailRegex);
  const email = foundEmail ? foundEmail[0] : undefined;
  return email;
};
