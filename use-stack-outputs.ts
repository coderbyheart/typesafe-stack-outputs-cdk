import { CloudFormationClient } from '@aws-sdk/client-cloudformation'
import { stackOutput } from '@nordicsemiconductor/cloudformation-helpers'
import { StackOutputs } from './stack'

const cf = new CloudFormationClient({})

const outputs = await stackOutput(cf)<StackOutputs>('MyStack')

console.log('Bucket name:', outputs.bucketName)
