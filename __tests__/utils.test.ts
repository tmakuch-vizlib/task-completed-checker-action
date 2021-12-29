import { removeIgnoreTaskLitsText } from "../src/utils";

describe("removeIgnoreTaskLitsText", () => {
  it("removes multiple ignore task list from task list text.", () => {
    const text = `## Issue Type
    <!-- ignore-task-list-start -->
    - [ ] Bug
    - [ ] Document
    - [x] Enhancement Feature
    <!-- ignore-task-list-end -->
    
    ## Checklist
    - [x] I have read the [CONTRIBUTING.md]()
    - [x] I have made corresponding changes to the documentation
    - [x] My changes generate no lint errors
    - [x] I have added tests that prove my fix is effective or that my feature works
    - [x] New and existing unit tests pass locally with my changes`;

    const result = removeIgnoreTaskLitsText(text);

    expect(result).toEqual(`## Issue Type
    
    
    ## Checklist
    - [x] I have read the [CONTRIBUTING.md]()
    - [x] I have made corresponding changes to the documentation
    - [x] My changes generate no lint errors
    - [x] I have added tests that prove my fix is effective or that my feature works
    - [x] New and existing unit tests pass locally with my changes`);
  });

  it("removes single ignore task list from task list text.", () => {
    const text = `<!-- ignore-task-list-start -->
    - [ ] foo
    <!-- ignore-task-list-end -->
    - [x] bar`;

    const result = removeIgnoreTaskLitsText(text);

    expect(result).toEqual(`
    - [x] bar`);
  });

  it("skips remove process if task list text does not contain ignore task list.", () => {
    const text = "- [x] bar";

    const result = removeIgnoreTaskLitsText(text);

    expect(result).toEqual("- [x] bar");
  });
});