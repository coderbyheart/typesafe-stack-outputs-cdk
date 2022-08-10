# Type-safe stack outputs in AWS CDK

_In order to ensure that the outputs of your CloudFormation Stacks are typed
properly, you can use this technique._

When defining the outputs, use a helper function that is bound to a type that
defines all stack outputs. This ensures that outputs that are created are
defined in the type definition.

```typescript
/**
 * This defines the outputs the stack creates
 */
export type StackOutputs = {
  bucketName: string;
};

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * A helper function that only allows
     * to create outputs that are defined in `StackOutputs`
     */
    const output = (name: keyof StackOutputs, value: string) =>
      new CfnOutput(this, name, {
        value,
      });

    const bucket = new Bucket(this, "bucket");
    output("bucketName", bucket.bucketName);
  }
}
```

This enables to use the type that defines the outputs when querying
CloudFormation for the stack outputs.  
In the example below we use
[`@nordicsemiconductor/cloudformation-helpers`](https://www.npmjs.com/package/@nordicsemiconductor/cloudformation-helpers),
which simplifies fetching stack outputs and accepts a type for defining which
outputs the stack returns. This will make `outputs` properly typed.

```typescript
const outputs = await stackOutput(new CloudFormationClient({}))<StackOutputs>(
  "MyStack"
);

console.log("Bucket name:", outputs.bucketName);
```

## Run the example

    npm ci

    npx cdk deploy
    # MyStack
    # Deployment time: 38.5s
    #
    # Outputs:
    # MyStack.bucketName = mystack-bucket43879c71-1prqx9wocdsp7

    npx tsx use-stack-outputs.ts
    # Bucket name mystack-bucket43879c71-1prqx9wocdsp7
