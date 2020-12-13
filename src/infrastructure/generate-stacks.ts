#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import BackendStack from "./backend-stack";
import ProductionFrontendStack from "./production-frontend-stack";

const generateStacks = (): void => {
  const environment = process.env.DEPLOYMENT_ENVIRONMENT;
  if (!environment) {
    throw new Error("You must specify the deployment environment");
  }

  const app = new cdk.App();

  const defaults = {
    env: {
      region: "us-east-1",
      account: "661272765443",
    },
    appName: "tnm-admin",
    domainName: "tnm-admin.com",
    friendlyName: "The TNM Admin app",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const details: any = {
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

  if (process.env.DO_BACKEND) {
    new BackendStack(
      app,
      `DevBackendStack${details[environment].envName}`,
      details[environment]
    );
  } else {
    new ProductionFrontendStack(
      app,
      details[environment].stackLabel,
      details[environment]
    );
  }
};

export default generateStacks;
