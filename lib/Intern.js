// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// Intern class
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getRole() {
    return "Intern";
  }

  getSchool() {
    return this.school;
  }
}

// Export Intern class
module.exports = Intern;
