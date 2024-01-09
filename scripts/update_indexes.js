const fs = require('fs').promises
// const fst = require('fs')
const path = require('path')

let cnt = 0;
const scriptDir = __dirname // /home/djlee/Project/personal-web/scripts
const relativeFilePath = '../content/index.mdx' // ../content/index.mdx
const targetFilePath = path.resolve(scriptDir, relativeFilePath) // /home/djlee/Project/personal-web/content/index.mdx

async function extractLinesFromVimwikiIndexFile(path) {
  try {
    const data = await fs.readFile(targetFilePath, 'utf8')

    const startIndex = data.indexOf('# Index')
    const nextHeaderIndex = data.indexOf('#', startIndex + 1)
    const endIndex = nextHeaderIndex !== -1 ? nextHeaderIndex : data.length

    const indexData = data.substring(startIndex, endIndex).trim()

    lines = indexData.split('\n')

    return lines

  } catch (err) {
    console.error(`Error reading the file: ${err}`)
    throw err // Propagate the error
  }
}

function filterLinesMatchesGivenPath(path, lines) {
  const result = lines.filter(line => line.includes(path))
  result.shift() // remove 1st element (category)
  return result
}

function extractIndexLines(lines) {
  const indexFlag = '/index)'
  return lines.filter(line => line.includes(indexFlag))
}

function toIndexFlag(line) {
  const match = line.match(/\]\(([^)]*\/)index\)/)
return match ? `(${match[1]}` : null
}

function initIndentation(lines) {
  const spaceCnt = lines[0].search(/\S/)
  return lines.map(line => line.substring(spaceCnt))
}

// Modify the path of the elements to match given path
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

// Modify new index lines to match current path
function modifyLinesBy(pathFlag, origLines) {
  const lines = filterLinesMatchesGivenPath(pathFlag, origLines)
  const indentedLines = initIndentation(lines)
  return modifyPath(pathFlag, indentedLines)
}

// Convert data array to formatted markdown string
function toIndexFormat(indexLines) {
  return `# Index\n${indexLines.join('\n')}\n`;
}

async function replaceIndex(targetFlag, newIndex) {
  const indexFileHead = '../content/'
  const indexFileTail = 'index.mdx'
  const indexHeader = '# Index'
  const relIndexFilePath = targetFlag.substring(1, targetFlag.length).concat(indexFileTail)
  const absIndexFilePath = path.resolve(scriptDir, indexFileHead.concat(relIndexFilePath))

  console.log(++cnt)
  console.log(absIndexFilePath)

  //TODO: To be removed
  // console.log(' absIndexFilePath: ' + absIndexFilePath)

  // Read the existing content of the file, if it exists
  let oldContent = ''
  try {
    oldContent = await fs.readFile(absIndexFilePath, 'utf8')
  } catch (err) {
    console.error(`Error reading the file: ${err}`)
    throw err // Propagate the error
  }

  console.log(++cnt)
  console.log(oldContent)

  // Find index header
  const startIndex = oldContent.indexOf(indexHeader)
  const endIndex = oldContent.length

  let newConent = ''
  //TODO: case; when file is not exist
  if (startIndex === -1) {
    newContent = newIndex
  } else {
    newContent = oldContent.substring(0, startIndex) + newIndex
  }

  // Update content
  fs.writeFile(absIndexFilePath, newContent, 'utf8')
}


async function print() {
  const origLines = await extractLinesFromVimwikiIndexFile(targetFilePath)
  const indexLines = await extractIndexLines(origLines)
  const indexFlags = indexLines.map(line => toIndexFlag(line))

  indexFlags.forEach(indexFlag => {

    const newIndex = toIndexFormat(modifyLinesBy(indexFlag, origLines))
    //TODO: To be removed
    // console.log('newIndex: ' + newIndex)
    replaceIndex(indexFlag, newIndex)
  })
}

print()
