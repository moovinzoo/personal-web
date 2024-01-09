const fs = require('fs/promises');
const { compile } = require('@mdx-js/mdx');

(async () => {
  const compiled = await compile(await fs.readFile('../content/index.mdx'));
  console.log(String(compiled));
})();
