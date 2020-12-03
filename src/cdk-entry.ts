#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import ProductionFrontendStack from "./infrastructure/production-frontend-stack";

const env = {
  region: "us-east-1",
  account: "661272765443",
};

const ref = process.env.GITHUB_REF ?? "main";

const app = new cdk.App();

if (ref.endsWith("main")) {
  // eslint-disable-next-line no-new
  new ProductionFrontendStack(app, "ProductionFrontendStackProd", {
    env,
    subdomain: "www",
    domainName: "tnm-admin.com",
  });
}

if (ref.endsWith("test")) {
  // eslint-disable-next-line no-new
  new ProductionFrontendStack(app, "ProductionFrontendStackTest", {
    env,
    subdomain: "test",
    domainName: "tnm-admin.com",
  });
}
