#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import * as git from "git-rev-sync";
import ProductionFrontendStack from "./infrastructure/production-frontend-stack";

const env = {
  region: "us-east-1",
  account: "661272765443",
};

const branch = git.branch();

const app = new cdk.App();

if (branch === "main") {
  // eslint-disable-next-line no-new
  new ProductionFrontendStack(app, "ProductionFrontendStackProd", {
    env,
    subdomain: "www",
    domainName: "tnm-admin.com",
  });
}

if (branch === "test") {
  // eslint-disable-next-line no-new
  new ProductionFrontendStack(app, "ProductionFrontendStackTest", {
    env,
    subdomain: "test",
    domainName: "tnm-admin.com",
  });
}
