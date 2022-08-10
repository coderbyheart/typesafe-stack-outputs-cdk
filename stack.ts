import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

/**
 * This defines the outputs the stack creates
 */
export type StackOutputs = {
	bucketName: string
}

export class MyStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		/**
		 * A helper function that only allows
		 * to create outputs that are defined in `StackOutputs`
		 */
		const output = (name: keyof StackOutputs, value: string) =>
			new CfnOutput(this, name, {
				value,
			})

		const bucket = new Bucket(this, 'bucket')
		output('bucketName', bucket.bucketName)
	}
}
