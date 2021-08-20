#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import BackendStack from "./backend-stack";
import ProductionFrontendStack from "./production-frontend-stack";

const generateStacks = (): void => {
  const app = new cdk.App();

  const account = process.env.IS_LOCALSTACK ? "000000000000" : "661272765443";

  const defaults = {
    env: {
      region: "us-east-1",
      account,
    },
    appName: "tnm-admin",
    domainName: "tnm-admin.com",
    friendlyName: "The TNM Admin app",
  };

  const details = {
    prod: {
      ...defaults,
      stackLabel: "ProductionFrontendStackProd",
      envName: "prod",
      subdomain: "www",
      url: "https://www.tnm-admin.com",
    },
    test: {
      ...defaults,
      stackLabel: "ProductionFrontendStackTest",
      envName: "test",
      subdomain: "test",
      url: "https://test.tnm-admin.com",
    },
    dev: {
      stackLabel: "ProductionFrontendStackDev",
      ...defaults,
      envName: "dev",
      subdomain: "dev",
      url: "https://dev.tnm-admin.com",
    },
  };

  Object.entries(details).forEach(([key, config]) => {
    new BackendStack(app, `DevBackendStack${key}`, config);
    new ProductionFrontendStack(app, config.stackLabel, config);
  });
};

export default generateStacks;
