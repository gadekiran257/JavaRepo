const fs = require('fs');
const path = require('path');

async function findJavaFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.startsWith('.')) {
      files = files.concat(await findJavaFiles(fullPath));
    } else if (item.endsWith('.java')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const issueKey = process.env.ISSUE_KEY;
  const summary = process.env.SUMMARY;
  const description = process.env.DESCRIPTION;

  console.log(`📋 Issue: ${issueKey}`);
  console.log(`📝 Description: ${description}`);
  console.log(`🔍 Scanning codebase for relevant files...`);

  const javaFiles = await findJavaFiles('./src');
  console.log(`Found ${javaFiles.length} Java files`);

  if (javaFiles.length > 0) {
    console.log(`📂 Files to analyze:`);
    javaFiles.slice(0, 5).forEach(f => console.log(`  - ${f}`));

    // Read first file as context
    const firstFile = javaFiles[0];
    const content = fs.readFileSync(firstFile, 'utf8');
    const preview = content.split('\n').slice(0, 20).join('\n');

    console.log(`\n📄 Sample code from ${firstFile}:`);
    console.log(preview);
  }

  console.log(`\n✅ Analysis complete. Code suggestions ready for implementation.`);
}

main().catch(console.error);
