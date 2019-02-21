const processData = require("./process_data");

class StudentStats {
  constructor(data) {
    this.data = processData(data);
  }
  queryProject(projectName) {
    if (!projectName || !this.data.projects[projectName]) {
      throw "Invalid Project Name";
    }
    return this.data.projects[projectName];
  }
  queryExperience(exp) {
    return this.data.experience[exp];
  }
  queryCohort() {
    return this.data.demographics;
  }
}

module.exports = StudentStats;
