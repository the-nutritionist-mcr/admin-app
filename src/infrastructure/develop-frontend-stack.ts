import * as cdk from "@aws-cdk/core";
import * as route53 from "@aws-cdk/aws-route53";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";

interface DevelopFrontendStackProps {
  subdomain: string;
  domainName: string;
}

export default class DevelopFrontendStack extends cdk.Stack {
  public constructor(
    scope: cdk.Construct,
    id: string,
    props: cdk.StackProps & DevelopFrontendStackProps
  ) {
    super(scope, id, props);

    const fullUrl = [props.subdomain, props.domainName].join(".");

    const bucket = new s3.Bucket(this, "DevelopFrontendStackBucket", {
      bucketName: fullUrl,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });

    // eslint-disable-next-line no-new
    new s3Deploy.BucketDeployment(this, "DevelopFrontendStackDeployment", {
      sources: [s3Deploy.Source.asset("./build")],
      destinationBucket: bucket,
    });

    const zone = route53.HostedZone.fromLookup(
      this,
      "DevelopFrontendStackHostedZone",
      {
        domainName: props.domainName,
      }
    );

    // eslint-disable-next-line no-new
    new route53.CnameRecord(this, "DevelopCname", {
      zone,
      recordName: fullUrl,
      domainName: bucket.bucketWebsiteDomainName,
    });
  }
}
