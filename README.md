# CLI-url-parser

## Start guide
1. Clone the project repo
2. run npm install
3. start the app using 'npm run start >pathToFile<' (E.G. npm run start testFiles/random.txt)


### Tests
App contains basic unit tests coverage that can be ran using 'npm run test' command


### Few notes -- future improvement
- This solution is built to meet the challenge requirements, it is not a comprehensive solution and there are edge cases that are not handled in this solution
- Tests coverage is really basic, unit tests should be improved, and the integration test should be added as suggested in 2nd bonus point
- This solution throws an error if a text file is not provided, should be replaced with the approach in 3rd bonus challenge
- Should be rewritten in typescript for easier readability
- Errors handling could be improved and error messages should be moved to the separate file
- Comments could be more descriptive
- Code could be cleaner and "architecture" could be improved

### Edge cases that will fail
- If there are multiple brackets within an escaped bracket (E.G. '\\[Some text [text] [text] [text] [text]]') script will behave weirdly and take opening bracket of the first brackets and closing bracket of the last bracket
- passing url starting with "https://..." will fail because there is currently no validation in place if https:// is already part of the url
- passing argument to the run script starting with "/" (E.G. "/testFiles/random.txt") will fail on windows machines

