# Simple “To-Do List” application using React, Typescript and Mobx

This project contains the source code for the Starlab test assignment application.

## Live App

Check out the live application here: [Live App](https://forstarlab.germans.dev/)

## Available Users

| Username  | Password |
|-----------|---------|
| admin     | 123     |
| user      | 123     |
| manager   | 123     |
| testuser  | 123     |

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.17.0) - You can check the recommended Node.js version in the `.nvmrc` file.

## Scripts

In this project, you can run the following Yarn scripts:

1. **start**
    - Description: This script serves the application using webpack-dev-server.
    - Usage: Run `yarn start` to start the development server on the specified port (default is 3000) using webpack.

2. **start:dev**
    - Description: This script concurrently runs the `start` script and a custom `start:dev:server` script in parallel.
    - Usage: Run `yarn run start:dev` to start both the application and the custom development server simultaneously.

3. **start:dev:server**
    - Description: This script starts a custom development server using Node.js for local API or JSON server development.
    - Usage: Run `yarn run start:dev:server` to start the custom development server for API/JSON server development.

4. **build:prod**
    - Description: This script builds the application for production using webpack.
    - Usage: Run `yarn run build:prod` to generate production-ready optimized code.

5. **build:dev**
    - Description: This script builds the application for development using webpack.
    - Usage: Run `yarn run build:dev` to generate development-ready code with source maps and other helpful development features.

6. **prettier**
    - Description: This script automatically formats TypeScript, TypeScript React, and JSON files using Prettier.
    - Usage: Run `yarn run prettier` to format relevant files within the project.

7. **lint:ts**
    - Description: This script runs ESLint to lint TypeScript and TypeScript React files.
    - Usage: Run `yarn run lint:ts` to identify and report any linting issues related to TypeScript.

8. **lint:ts:fix**
    - Description: This script runs ESLint and attempts to automatically fix linting issues in TypeScript and TypeScript React files.
    - Usage: Run `yarn run lint:ts:fix` to apply automatic fixes to TypeScript-related linting issues.

9. **lint:scss**
    - Description: This script runs Stylelint to lint SCSS (Sass) files.
    - Usage: Run `yarn run lint:scss` to identify and report any linting issues related to SCSS files.

10. **lint:scss:fix**
    - Description: This script runs Stylelint and attempts to automatically fix linting issues in SCSS (Sass) files.
    - Usage: Run `yarn run lint:scss:fix` to apply automatic fixes to SCSS-related linting issues.

11. **test:unit**
    - Description: This script runs Jest for unit testing the application.
    - Usage: Run `yarn run test:unit` to execute unit tests based on the configuration specified in `./config/jest/jest.config.ts`.

Please feel free to use the scripts that suit your development and testing needs. If you have any questions or need further information, refer to the package.json file or contact the project maintainers.
