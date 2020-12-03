import * as cdk from "@aws-cdk/core";
import * as certificateManager from "@aws-cdk/aws-certificatemanager";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as route53 from "@aws-cdk/aws-route53";
import * as route53Targets from "@aws-cdk/aws-route53-targets";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";

interface ProductionFrontendStackProps {
  subdomain: string;
  domainName: string;
}

export default class ProductionFrontendStack extends cdk.Stack {
  public constructor(
    scope: cdk.Construct,
    id: string,
    props: cdk.StackProps & ProductionFrontendStackProps
  ) {
    super(scope, id, props);

    const fullUrl = [props.subdomain, props.domainName].join(".");

    const bucket = new s3.Bucket(this, "ProductionFrontendStackBucket", {
      bucketName: fullUrl,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });

    // eslint-disable-next-line no-new
    new s3Deploy.BucketDeployment(this, "ProductionFrontendStackDeployment", {
      sources: [s3Deploy.Source.asset("./build")],
      destinationBucket: bucket,
    });

    const zone = route53.HostedZone.fromLookup(
      this,
      "ProductionFrontendStackHostedZone",
      {
        domainName: props.domainName,
      }
    );

    const domainName = props.subdomain === "www" ? props.domainName : fullUrl;
    const subjectAlternativeNames =
      props.subdomain === "www" ? [fullUrl] : undefined;

    const certificate = new certificateManager.DnsValidatedCertificate(
      this,
      "ProductionFrontendStackCertificate",
      {
        domainName,
        hostedZone: zone,
        subjectAlternativeNames,
      }
    );

    const aliases =
      props.subdomain === "www" ? [props.domainName, fullUrl] : [fullUrl];

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "ProductionFrontendStackDistro",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          { aliases }
        ),
      }
    );

    // eslint-disable-next-line no-new
    new route53.ARecord(this, "ProductionFrontendStackARecord", {
      zone,
      recordName: fullUrl,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution)
      ),
    });

    // If (props.subdomain === "www") {
    //   // eslint-disable-next-line no-new
    //   new route53.CnameRecord(this, "ProductionFrontendStackCnameRecord", {
    //     zone,
    //     domainName: props.domainName,
    //     recordName: fullUrl,
    //   });
    // }
  }
}
