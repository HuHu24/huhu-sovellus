# Contributing

## Getting Started

This steps will help you to set up your development environment. That includes all dependencies we use to build HuHu sovellus

1. Clone the git repository: `git clone https://github.com/HuHu24/huhu-sovellus.git`
2. Go into the cloned folder: `cd huhu-sovellus/`
3. Make a new branch for the ticket `git branch <ticket name and number for example front-page-#1>`
4. Checkout branch `git checkout <your branch name>`
5. Install all dependencies: `npm install`
6. Run development server `npm run dev`

## The Repo Structure

A quick overview of our repository:

```bash
# The repo root (folder where you cloned the repo into)
/
  src/  # Source code of our core
    app/ # All .tsx code
  public/ # Assets like images, vectors and fonts

  package.json # Contains build scripts and dependencies for development
```

## How to commit

Use commit prefixes when committing

- feat – a new feature is introduced with the changes
- fix – a bug fix has occurred
- chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- refactor – refactored code that neither fixes a bug nor adds a feature
- docs – updates to documentation such as a the README or other markdown files
- style – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
- test – including new or correcting previous tests
- perf – performance improvements
- ci – continuous integration related
- build – changes that affect the build system or external dependencies
- revert – reverts a previous commit

## How to merge to main

1. Push your branch to GitHub
2. Make a pull request
   1. Write description about what has changed
   2. Link corresponding issue to it
3. Wait for approval and merging
