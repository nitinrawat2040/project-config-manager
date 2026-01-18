const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "projects.json");

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

const args = process.argv.slice(2);
const command = args[0];

// Helper functions
function readProjects() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeProjects(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Add command
if (command === "add") {
  const name = args[1];

  if (!name) {
    console.error(" Project name is required.");
    process.exit(1);
  }

  const portIndex = args.indexOf("--port");
  const cmdIndex = args.indexOf("--cmd");
  const pathIndex = args.indexOf("--path");

  if (portIndex === -1 || cmdIndex === -1 || pathIndex === -1) {
    console.error(" Missing required arguments.");
    process.exit(1);
  }

  const project = {
    name,
    port: args[portIndex + 1],
    command: args[cmdIndex + 1],
    path: args[pathIndex + 1],
    createdAt: new Date().toISOString()
  };

  const projects = readProjects();

  if (projects.find(p => p.name === name)) {
    console.error(" Project already exists.");
    process.exit(1);
  }

  projects.push(project);
  writeProjects(projects);

  console.log(" Project added successfully.");

} 
// List command
else if (command === "list") {
  const projects = readProjects();

  if (projects.length === 0) {
    console.log(" No projects found.");
    return;
  }

  projects.forEach(p => {
    console.log(`- ${p.name} (Port: ${p.port})`);
  });

} 
// Show command
else if (command === "show") {
  const name = args[1];

  if (!name) {
    console.error(" Project name is required.");
    process.exit(1);
  }

  const projects = readProjects();
  const project = projects.find(p => p.name === name);

  if (!project) {
    console.error(" Project not found.");
    process.exit(1);
  }

  console.log(" Project Details:");
  console.log(`Name      : ${project.name}`);
  console.log(`Port      : ${project.port}`);
  console.log(`Command   : ${project.command}`);
  console.log(`Path      : ${project.path}`);
  console.log(`Created At: ${project.createdAt}`);

} 
// Delete command
else if (command === "delete") {
  const name = args[1];

  if (!name) {
    console.error(" Project name is required.");
    process.exit(1);
  }

  const projects = readProjects();
  const updatedProjects = projects.filter(p => p.name !== name);

  if (projects.length === updatedProjects.length) {
    console.error(" Project not found.");
    process.exit(1);
  }

  writeProjects(updatedProjects);
  console.log(` Project "${name}" deleted successfully.`);
}

else {
  console.log(`
Available Commands:
  add <name> --port <port> --cmd "<command>" --path "<path>"
  list
  show <name>
`);
}
