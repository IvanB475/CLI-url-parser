

if(process.argv.length < 3) {
    console.log("please provide path to .txt file")
    process.kill(process.pid, 'SIGTERM')
}

const pathToTxtFile = process.argv[2];

if(!pathToTxtFile.includes('.txt')) {
    console.log("Argument provided is not a .txt file")
    process.kill(process.pid, 'SIGTERM')
}

