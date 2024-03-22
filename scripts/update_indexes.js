const fs = require('fs').promises;
const path = require('path');

// Read lines from a Vimwiki index file
async function extractLinesFromVimwikiIndexFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const startIndex = data.indexOf('# Index');
    const nextHeaderIndex = data.indexOf('#', startIndex + 1);
    const endIndex = nextHeaderIndex !== -1 ? nextHeaderIndex : data.length;
    const indexData = data.substring(startIndex, endIndex).trim();
    return indexData.split('\n');
  } catch (err) {
    console.error(`Error reading the file: ${err}`);
    throw err;
  }
}

// Filter lines under given path
function filterLinesMatchesGivenPath(path, lines) {
  const result = lines.filter(line => line.includes(path));
  result.shift(); // remove 1st element (category)
  return result;
}

// Extract lines containing '/index)'
function extractIndexLines(lines) {
  const indexFlag = '/index)';
  return lines.filter(line => line.includes(indexFlag));
}

// Convert line to '(/path/'
function toIndexFlag(line) {
  const match = line.match(/\]\(([^)]*\/)index\)/);
  return match ? `(${match[1]}` : null;
}

// Initialize indentation based on the first line
function initIndentation(lines) {
  const spaceCnt = lines[0].search(/\S/);
  return lines.map(line => line.substring(spaceCnt));
}

// Modify the path of the elements to match the given path
function modifyPath(pathFlag, lines) {
  // Ensure the flag starts with '(' and ends with '/'
  if (!pathFlag.startsWith('(') || !pathFlag.endsWith('/')) {
    throw new Error('Invalid flag format. Flag should start with "(" and end with "/".');
  }

  // Extract the content inside the flag (excluding the first character '(')
  const extractedPath = pathFlag.substring(1, pathFlag.length - 1);

  // Iterate through each line and remove the flag
  const result = lines.map(line => {
    const flagIndex = line.indexOf(extractedPath);
    if (flagIndex !== -1) {
      // Replace the flag with an empty string (except the first character '(')
      return line.substring(0, flagIndex) + line.substring(flagIndex + extractedPath.length + 1);
    }
    return line;
  });

  return result;
}

// Modify new index lines to match the current path
function modifyLinesBy(pathFlag, origLines) {
  const lines = filterLinesMatchesGivenPath(pathFlag, origLines);
  const indentedLines = initIndentation(lines);
  return modifyPath(pathFlag, indentedLines);
}

// Convert data array to formatted markdown string
function toIndexFormat(indexLines) {
  return `# Index\n${indexLines.join('\n')}\n`;
}

// Replace the content of the index file
async function replaceIndex(targetFlag, newIndex, scriptDir) {
  const indexFileHead = '../content/';
  const indexFileTail = 'index.mdx';
  const indexHeader = '# Index';
  const relIndexFilePath = targetFlag.substring(1, targetFlag.length).concat(indexFileTail);
  const absIndexFilePath = path.resolve(scriptDir, indexFileHead.concat(relIndexFilePath));

  // Read the existing content of the file, if it exists
  let oldContent = '';
  try {
    oldContent = await fs.readFile(absIndexFilePath, 'utf8');
  } catch (err) {
    console.error(`Error reading the file: ${err}`);
    throw err;
  }

  // Find index header
  const startIndex = oldContent.indexOf(indexHeader);
  const endIndex = oldContent.length;

  let newContent = '';
  if (startIndex === -1) {
    newContent = newIndex;
  } else {
    newContent = oldContent.substring(0, startIndex) + newIndex;
  }

  // Update content
  await fs.writeFile(absIndexFilePath, newContent, 'utf8');
}

// Main function to update index files
async function updateIndexFiles() {
  const scriptDir = __dirname;
  const targetFilePath = path.resolve(scriptDir, '../content/index.mdx');

  try {
    // Extract original lines from the Vimwiki index file
    const origLines = await extractLinesFromVimwikiIndexFile(targetFilePath);

    // Extract lines containing '/index)'
    const indexLines = extractIndexLines(origLines);

    // Extract index flags from the lines
    const indexFlags = indexLines.map(line => toIndexFlag(line));

    // Iterate through each index flag and update the index file
    for (const indexFlag of indexFlags) {
      // Modify the lines to match the current path
      const newIndex = toIndexFormat(modifyLinesBy(indexFlag, origLines));

      // Replace the content of the index file
      await replaceIndex(indexFlag, newIndex, scriptDir);
    }

    console.log('Index files updated successfully!');
  } catch (err) {
    console.error(`Error updating index files: ${err}`);
  }
}

// Call the main function to update index files
updateIndexFiles();

