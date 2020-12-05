import * as appsync from "@aws-cdk/aws-appsync";
import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";
import * as ddb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";

// eslint-disable-next-line unicorn/import-style
import * as path from "path";

interface BackendStackProps {
  envName: string;
  appName: string;
  friendlyName: string;
  url: string;
}

export default class BackendStack extends cdk.Stack {
  public constructor(
    scope: cdk.Construct,
    id: string,
    props: cdk.StackProps & BackendStackProps
  ) {
    super(scope, id, props);

    const name = `${props.envName}-${props.appName}`.toLowerCase();

    const verificationString = `Hey {username}, Thanks for signing up to ${props.friendlyName}. Your verification code is {####}`;
    const invitationString = `Hey {username}, you have been invited to join ${props.friendlyName}. Your temporary password is {####}`;
    const pool = new cognito.UserPool(this, "Users", {
      userPoolName: `${name}-users`,
      selfSignUpEnabled: true,

      userVerification: {
        emailBody: verificationString,
        emailSubject: `${props.friendlyName} signup`,
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage: verificationString,
      },

      userInvitation: {
        emailSubject: `${props.friendlyName} invite`,
        emailBody: invitationString,
        smsMessage: invitationString,
      },

      signInAliases: {
        username: true,
        email: true,
        phone: true,
      },
    });

    const client = pool.addClient("Client", {
      oAuth: {
        callbackUrls: [props.url],
      },
    });

    const domain = pool.addDomain("Domain", {
      cognitoDomain: {
        domainPrefix: `${name}-auth`,
      },
    });

    const signInUrl = domain.signInUrl(client, {
      redirectUri: props.url,
    });

    const url = domain.baseUrl();

    // eslint-disable-next-line no-new
    new cdk.CfnOutput(this, "Auth Url", {
      value: url,
    });

    // eslint-disable-next-line no-new
    new cdk.CfnOutput(this, "Redirect Url", {
      value: signInUrl,
    });

    const api = new appsync.GraphqlApi(this, "Api", {
      name: `${name}-api`,
      schema: appsync.Schema.fromAsset(
        path.resolve(__dirname, "..", "schema", "schema.graphql")
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: pool,
          },
        },
      },
    });

    // eslint-disable-next-line no-new
    new cdk.CfnOutput(this, "GraphQlQpiUrl", {
      value: api.graphqlUrl,
    });

    const resolverLambda = new lambda.Function(this, "AppResolverLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "main.handler",
      code: lambda.Code.fromAsset(
        path.resolve(__dirname, "..", "..", "dist", "bundles", "backend")
      ),
      memorySize: 1024,
    });

    const lambdaDataSource = api.addLambdaDataSource(
      "lambdaDataSource",
      resolverLambda
    );

    lambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: "getExclusionById",
    });

    lambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: "listExclusions",
    });

    lambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: "getRecipeById",
    });

    lambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: "listRecipes",
    });

    lambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: "getCustomerById",
    });

    lambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: "listCustomers",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateRecipe",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteRecipe",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "createRecipe",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateCustomer",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "createCustomer",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteCustomer",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateExclusion",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "createExclusion",
    });

    lambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteExclusion",
    });

    const customersTable = new ddb.Table(this, "CustomersTable", {
      tableName: `${name}-customers-table`,
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    customersTable.grantFullAccess(resolverLambda);
    resolverLambda.addEnvironment("CUSTOMERS_TABLE", customersTable.tableName);

    const exclusionsTable = new ddb.Table(this, "ExclusionsTable", {
      tableName: `${name}-exclusions-table`,
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    exclusionsTable.grantFullAccess(resolverLambda);
    resolverLambda.addEnvironment(
      "EXCLUSIONS_TABLE",
      exclusionsTable.tableName
    );

    const recipesTable = new ddb.Table(this, "RecipesTable", {
      tableName: `${name}-recipes-table`,
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    recipesTable.grantFullAccess(resolverLambda);
    resolverLambda.addEnvironment("RECIPES_TABLE", recipesTable.tableName);

    const customerExclusionsTable = new ddb.Table(
      this,
      "CustomerExclusionsTable",
      {
        tableName: `${name}-customer-exclusions-table`,
        billingMode: ddb.BillingMode.PAY_PER_REQUEST,
        partitionKey: {
          name: "id",
          type: ddb.AttributeType.STRING,
        },
      }
    );

    customerExclusionsTable.grantFullAccess(resolverLambda);
    resolverLambda.addEnvironment(
      "CUSTOMER_EXCLUSIONS_TABLE",
      customerExclusionsTable.tableName
    );
  }
}
