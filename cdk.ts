import { App } from 'aws-cdk-lib'
import { MyStack } from './stack'

const app = new App({})

new MyStack(app, `MyStack`)
