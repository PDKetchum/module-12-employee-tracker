const Role = require("../lib/role");

describe("Role", () => {
  const role = new Role("Senior Marketing Analyst", 95000, 5);

  it("Should create a role instance", () => {
    expect(typeof role).toBe("object");
  });
  it("Should have title", () => {
    const title = "Senior Marketing Analyst";
    expect(role.getTitle()).toBe(title);
  });
  it("Should have a department id", () => {
    const departmentId = 5;
    expect(role.getDepartmentId()).toBe(departmentId);
  });
});
