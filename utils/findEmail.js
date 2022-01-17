import chalk from "chalk";


//helper function that searches for the first email within provided string
export const findEmail = (htmlBody) => {
  if (!htmlBody) {
    console.error(chalk.red("findEmail requires htmlBody to be provided"));
    process.kill(process.pid, "SIGTERM");
  }

  const foundEmail = htmlBody.match(
    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
  );
  const email = foundEmail ? foundEmail[0] : undefined;
  return email;
};
