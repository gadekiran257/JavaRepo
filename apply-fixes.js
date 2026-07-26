const fs = require('fs');
const path = require('path');

async function findAndFixFiles() {
  const description = process.env.DESCRIPTION;
  console.log(`🔧 Applying fixes for: ${description}`);

  // Check for greeting message changes
  if (description.toLowerCase().includes('greeting') || 
      description.toLowerCase().includes('message')) {

    console.log(`📝 Detected greeting message requirement`);

    // Find REST API controller
    const files = fs.readdirSync('./src/main/java', { recursive: true });
    const controllerFiles = files.filter(f => 
      f.includes('Controller') && f.endsWith('.java')
    );

    if (controllerFiles.length > 0) {
      const controllerPath = path.join('./src/main/java', controllerFiles[0]);
      console.log(`✏️  Updating ${controllerPath}`);

      let content = fs.readFileSync(controllerPath, 'utf8');

      // Example fix: Update greeting endpoint
      const greetingUpdate = content.replace(
        /return\s+"[^"]*";\s*\/\/.*greeting/gi,
        'return "Hello from JIRA-auto-fixed API"; // Greeting message updated'
      );

      if (greetingUpdate !== content) {
        fs.writeFileSync(controllerPath, greetingUpdate);
        console.log(`✅ Updated greeting message`);
      } else {
        console.log(`ℹ️  Greeting message pattern not found, skipping`);
      }
    }
  }
}

findAndFixFiles().catch(console.error);
