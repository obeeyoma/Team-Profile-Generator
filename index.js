const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Array for all members of the team
const teamMembersArr = [];

// Function to ask for manager's information
function getManagerInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the team manager's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the team manager's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the team manager's email address:",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the team manager's office number:",
      },
    ])
    .then((answers) => {
      // Create Manager object with provided input
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      // Add Manager object to teamMembers array
      teamMembersArr.push(manager);
      //Request next action
      getOptions();
    });
}

// Function to ask for Engineer's information
function getEngineerInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the engineer's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the engineer's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the engineer's email address:",
      },
      {
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub username:",
      },
    ])
    .then((answers) => {
      // Create Engineer object with provided input
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      // Add Engineer object to teamMembers array
      teamMembersArr.push(engineer);
      //Request next action
      getOptions();
    });
}

// Function to ask for Intern's information
function getInternInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the intern's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the intern's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the intern's email address:",
      },
      {
        type: "input",
        name: "school",
        message: "Enter the intern's school:",
      },
    ])
    .then((answers) => {
      // Create Intern object with provided input
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      // Add Intern object to teamMembers array
      teamMembersArr.push(intern);
      //Request next action
      getOptions();
    });
}

// Function to present user with options for the next action
function getOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do next?",
        choices: [
          "Add an engineer",
          "Add an intern",
          "Finish building the team",
        ],
      },
    ])
    .then((answers) => {
      // Call the appropriate function based on selected option
      switch (answers.options) {
        case "Add an engineer":
          getEngineerInfo();
          break;
        case "Add an intern":
          getInternInfo();
          break;
        case "Finish building the team":
          // Generate the HTML
          generateHTML();
          break;
      }
    });
}

// Function to generate HTML
function generateHTML() {
  const html = render(teamMembersArr);
  // If the output folder does not exist, create it
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  // Write the HTML to the output folder
  fs.writeFileSync(outputPath, html);
  console.log(`Team Profile HTML generated at ${outputPath}`);
}

// Begin process
getManagerInfo();
