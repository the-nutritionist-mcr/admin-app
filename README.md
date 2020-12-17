# tnm-admin.com

<img src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/><img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/><img src="https://img.shields.io/badge/AWS%20-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white"/><img src="https://img.shields.io/badge/github%20actions%20-%232671E5.svg?&style=for-the-badge&logo=github%20actions&logoColor=white"/>

This repository is a bespoke full stack TypeScript web application designed to help the
day to day running of The Nutritionist Manchester. It is at current in pre-alpha
stage

## Deployment

Deployment is triggered automatically by Github Actions.

- Merging to `master` triggers a pipeline which runs linting and unit tests, deploys to
  [test](https://test.tnm-admin.com), runs end to end tests against test, then
  deploys to [production](https://www.tnm-admin.com) so long as everything passes.
- `develop` also triggers a unit test and lint run and then deployment to the
  [dev](https://dev.tnm-admin.com) environment only

## Deployment statuses

| Environment                       | Status                                                                                                                                                                                                    | Unit test coverage                                                                                                            |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [Prod](https://www.tnm-admin.com) | [![Production](https://github.com/benwainwright/tnm/workflows/Deploy%20%28prod%29/badge.svg?branch=main)](https://github.com/benwainwright/tnm/actions?query=workflow%3A%22Production+deploy+pipeline%22) | [![codecov](https://codecov.io/gh/benwainwright/tnm/branch/main/graph/badge.svg)](https://codecov.io/gh/benwainwright/tnm)    |
| [Dev](http://dev.tnm-admin.com)   | [![Dev](https://github.com/benwainwright/tnm/workflows/Deploy%20%28dev%29/badge.svg?branch=develop)](https://github.com/benwainwright/tnm/actions?query=workflow%3A%22Deploy%20%28dev%29)                 | [![codecov](https://codecov.io/gh/benwainwright/tnm/branch/develop/graph/badge.svg)](https://codecov.io/gh/benwainwright/tnm) |

## Hosting

The application is a static react application hosted on S3 + Cloudfront with an backend comprising of AppSync, Cognito and DynamoDb

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn lint`

Lints all files in the project

### `yarn build`

Builds the app for production to the `build` folder.
