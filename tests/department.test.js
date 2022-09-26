const Department = require("../lib/department");

describe("Deparment", () => {
  const department = new Department(5, "Marketing");

  it("Should create a department instance", () => {
    expect(typeof department).toBe("object");
  });
  it("Should have name", () => {
    const name = "Marketing";
    expect(department.getName()).toBe(name);
  });
  it("Should have an id", () => {
    const id = 5;
    expect(department.getId()).toBe(id);
  });
});
