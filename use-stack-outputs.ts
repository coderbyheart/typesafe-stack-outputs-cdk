import { CloudFormationClient } from '@aws-sdk/client-cloudformation'
import { stackOutput } from '@nordicsemiconductor/cloudformation-helpers'
import { StackOutputs } from './stack'

const outputs = await stackOutput(new CloudFormationClient({}))<StackOutputs>(
	'MyStack',
)

console.log('Bucket name:', outputs.bucketName)
