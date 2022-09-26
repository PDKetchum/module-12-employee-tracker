const Employee = require("../lib/employee");

describe("Employee", () => {
  const employee = new Employee("Tom", "Nguyen", 3, null);

  it("Should create a employee instance", () => {
    expect(typeof employee).toBe("object");
  });
  it("Should have first name", () => {
    const firstName = "Tom";
    expect(employee.getFirstName()).toBe(firstName);
  });
  it("Should have last name", () => {
    const lastName = "Nguyen";
    expect(employee.getLastName()).toBe(lastName);
  });
  it("Should have role id", () => {
    const roleId = 3;
    expect(employee.getRoleId()).toBe(roleId);
  });
  it("Should have manager id", () => {
    const managerId = null;
    expect(employee.getManagerId()).toBe(managerId);
  });
});
