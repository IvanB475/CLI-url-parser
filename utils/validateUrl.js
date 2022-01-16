// finds valid urls within given line
export const isValidURL = (line) => {
    const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const urls = line.match(urlRegex);
    return (urls !== null)
  };
