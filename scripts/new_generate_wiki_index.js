const fs = require('fs').promises;
const path = require('path');

// Declare the lines variable in the outer scope
let lines = [];

// Function to read the file and return a promise
const readFile = async () => {
  // Get the directory where the script is located
  const scriptDir = __dirname;

  // Specify the relative path to the target file from the script's directory
  const relativeFilePath = '../content/index.mdx';

  // Resolve the absolute path to the target file
  const targetFilePath = path.resolve(scriptDir, relativeFilePath);

  try {
    // Read the content of the target file
    const data = await fs.readFile(targetFilePath, 'utf8');

    // Extract data under the header "# Index"
    const startIndex = data.indexOf('# Index');
    const nextHeaderIndex = data.indexOf('#', startIndex + 1);

    // Check if there is a next header
    const endIndex = nextHeaderIndex !== -1 ? nextHeaderIndex : data.length;

    const indexData = data.substring(startIndex, endIndex).trim();

    // Chunk lines into a list while preserving leading spaces
    lines = indexData.split('\n');

    // Return the processed lines
    return lines;
  } catch (err) {
    console.error(`Error reading the file: ${err}`);
    throw err; // Propagate the error
  }
};

// Function to process the file content
const processFileContent = async () => {
  // Call the readFile function to ensure it's executed
  await readFile();

  // Log the list of lines
  console.log('Processed lines:', lines);
};

// Call the processFileContent function
processFileContent();

