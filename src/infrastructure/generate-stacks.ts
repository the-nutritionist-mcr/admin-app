#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import DevelopFrontendStack from "./develop-frontend-stack";
import ProductionFrontendStack from "./production-frontend-stack";

const generateStacks = (): void => {
  const env = {
    region: "us-east-1",
    account: "661272765443",
  };

  const ref = process.env.GITHUB_REF ?? "main";

  const app = new cdk.App();

  const domainName = "tnm-admin.com";

  if (ref.endsWith("main")) {
    // eslint-disable-next-line no-new
    new ProductionFrontendStack(app, "ProductionFrontendStackProd", {
      env,
      subdomain: "www",
      domainName,
    });
  }

  if (ref.endsWith("test")) {
    // eslint-disable-next-line no-new
    new ProductionFrontendStack(app, "ProductionFrontendStackTest", {
      env,
      subdomain: "test",
      domainName,
    });
  }

  if (ref.endsWith("develop")) {
    // eslint-disable-next-line no-new
    new DevelopFrontendStack(app, "DevelopFrontendStack", {
      env,
      subdomain: "dev",
      domainName,
    });
  }
};

export default generateStacks;
