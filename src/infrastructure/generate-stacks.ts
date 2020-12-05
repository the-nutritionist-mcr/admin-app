#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import BackendStack from "./backend-stack";
import ProductionFrontendStack from "./production-frontend-stack";

const generateStacks = (): void => {
  const ref = process.env.GITHUB_REF ?? "main";
  const branch = ref.split("/")[ref.split("/").length - 1];

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
    main: {
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
    develop: {
      stackLabel: "ProductionFrontendStackDev",
      ...defaults,
      envName: "dev",
      subdomain: "dev",
      url: "https://dev.tnm-admin.com",
    },
  };

  if (process.env.DO_BACKEND) {
    // eslint-disable-next-line no-new
    new BackendStack(
      app,
      `DevBackendStack${details[branch].envName}`,
      details[branch]
    );
  } else {
    // eslint-disable-next-line no-new
    new ProductionFrontendStack(
      app,
      details[branch].stackLabel,
      details[branch]
    );
  }
};

export default generateStacks;
