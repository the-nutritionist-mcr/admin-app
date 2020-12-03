#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import ProductionFrontendStack from "./infrastructure/production-frontend-stack";

const env = {
  region: "us-east-1",
  account: "661272765443",
};

const app = new cdk.App();

// eslint-disable-next-line no-new
new ProductionFrontendStack(app, "ProductionFrontendStackProd", {
  env,
  subdomain: "www",
  domainName: "tnm-admin.com",
});
