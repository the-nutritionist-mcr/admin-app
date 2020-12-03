# www.tnm-admin.com

<img src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/><img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/><img src="https://img.shields.io/badge/AWS%20-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white"/><img src="https://img.shields.io/badge/github%20actions%20-%232671E5.svg?&style=for-the-badge&logo=github%20actions&logoColor=white"/>

This repository is a bespoke full stack TypeScript web application designed to help the
day to day running of The Nutritionist Manchester. It is at current in pre-alpha
stage

## Deployment

Deployment is performed automatically by Github actions for three main branches

| Branch    | Environment                        | Status                                                                                                          | Unit test coverage                                                                                                            |
| --------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `main`    | [Prod](https://www.tnm-admin.com)  | ![Production](https://github.com/benwainwright/tnm/workflows/Build%20test%20and%20deploy/badge.svg?branch=main) | [![codecov](https://codecov.io/gh/benwainwright/tnm/branch/main/graph/badge.svg)](https://codecov.io/gh/benwainwright/tnm)    |
| `test`    | [Test](https://test.tnm-admin.com) | ![Test](https://github.com/benwainwright/tnm/workflows/Build%20test%20and%20deploy/badge.svg?branch=main)       | [![codecov](https://codecov.io/gh/benwainwright/tnm/branch/test/graph/badge.svg)](https://codecov.io/gh/benwainwright/tnm)    |
| `develop` | [Dev](http://dev.tnm-admin.com)    | ![Dev](https://github.com/benwainwright/tnm/workflows/Build%20test%20and%20deploy/badge.svg?branch=develop)     | [![codecov](https://codecov.io/gh/benwainwright/tnm/branch/develop/graph/badge.svg)](https://codecov.io/gh/benwainwright/tnm) |

## Hosting

The application is a static react application hosted on S3 + Cloudfront with an AWS Amplify backend.

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
