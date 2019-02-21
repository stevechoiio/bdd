jest.setMock(
  "../src/process_data.json",
  require("../__mocks__/process_data.mock")
);
const StudentStats = require("../src/student_stats.js");

describe("Student", () => {
  let test;
  beforeEach(() => {
    test = {};
    test.projectName = "aloha";

    //we will give a data that we need from process_data
    test.simpleProcessedData = {
      demographics: {
        averageAge: 26.2,
        averageExperience: 3.2
      },
      projects: {
        [test.projectName]: {
          passPercentage: 40,
          passSatisfaction: 4,
          failSatisfaction: 2
        }
      },
      experience: {
        1: {
          averageSatisfaction: 2.1
        },
        2: {
          averageSatisfaction: 4.2
        },
        4: {
          averageSatisfaction: 3.5
        }
      }
    };
  });

  describe("queryProject() ", () => {
    beforeEach(() => {
      test.subject = new StudentStats(test.simpleProcessedData);
      test.projectData = test.simpleProcessedData.projects[test.projectName];
    });
    describe("when the project name does not exist", () => {
      it("should throw an error", () => {
        expect(() => {
          test.subject.queryProject("aaa");
        }).toThrow("Invalid Project Name");
      });
    });
    describe("when the project name does exist", () => {
      beforeEach(() => {
        test.result = test.subject.queryProject(test.projectName);
      });
      it("should return the % of students that passes the project", () => {
        expect(test.result.passPercentage).toEqual(
          test.projectData.passPercentage
        );
      });
      it("should return the pass satisfaction", () => {
        expect(test.result.passSatisfaction).toEqual(
          test.projectData.passSatisfaction
        );
      });
      it("should return the % of fail statisfaction", () => {
        expect(test.result.failSatisfaction).toEqual(
          test.projectData.failSatisfaction
        );
      });
    });
  });
  describe("queryExperience()", () => {
    beforeEach(() => {
      test.subject = new StudentStats(test.simpleProcessedData);
      test.experience = test.simpleProcessedData.experience;
    });
    describe("when invalid experience is input", () => {
      beforeEach(() => {
        test.result = test.subject.queryExperience(10);
      });

      it("should throw an error", () => {
        expect(test.result).toBeUndefined();
      });
    });
    describe("when valid experience is input", () => {
      beforeEach(() => {
        test.yearsExp = 2;
        test.result = test.subject.queryExperience(test.yearsExp);
      });

      it("should return the average", () => {
        expect(test.result).toEqual(test.experience[test.yearsExp]);
      });
    });
  });
  describe("queryCohort()", () => {
    beforeEach(() => {
      test.subject = new StudentStats(test.simpleProcessedData);
      test.result = test.subject.queryCohort();
    });

    it("should return the avg age of the students", () => {
      expect(test.result.averageAge).toEqual(
        test.simpleProcessedData.demographics.averageAge
      );
    });
    it("should return the avg exp of the students", () => {
      expect(test.result.averageExperience).toEqual(
        test.simpleProcessedData.demographics.averageExperience
      );
    });
  });
});
