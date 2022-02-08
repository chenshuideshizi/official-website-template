const _ = require('lodash');

const path = require('path');
const { writeFileSync } = require('fs');
const OUTPUT_DIR = '../src/less/themes';
const THEMES_CONFIG = require('../themes.config');
const CONTENT = `@import "../index";`
const HEADER = '// Generate by Script, Config file is themes.config.js';

const write = _.partial(writeFileSync, _, _, 'utf8');


Object.entries(THEMES_CONFIG).forEach(([theme, config]) => {
  const fileName = `${theme}.less`;
  const modifyVariablesContent = Object.entries(config).map(([key, value]) => `@${key}:${value};`).join('\r')

  const content = `
@import "../index";

// Generate by Script, Config file is themes.config.js
${modifyVariablesContent}
`;

  const outPutFilePath = path.join(__dirname, OUTPUT_DIR, fileName);
  let flag = true;
  try {
    write(outPutFilePath, content);
  } catch (e) {
    flag = false;
  }
  console.log(`Generate ${outPutFilePath} ${flag ? 'Succeed' : 'Failed'}.`);
})

// 生成所有皮肤文件入口
const jsContent = Object.keys(THEMES_CONFIG).map(theme => `import './less/themes/${theme}.less';`).join('\r');
write(path.join(__dirname, '../src/themes.js'), `${HEADER}
${jsContent}`);
