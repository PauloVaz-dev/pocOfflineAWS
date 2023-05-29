import { SQSClient } from '@aws-sdk/client-sqs'
import { DynamoDB } from 'aws-sdk'

export const sqsClient = process.env.IS_OFFLINE
  ? new SQSClient({
      region: process.env.REGION,
      endpoint: 'http://localhost:9324',
    })
  : new SQSClient({ region: process.env.REGION })

export const dynamoDbClient = process.env.IS_OFFLINE
  ? new DynamoDB.DocumentClient({
      region: process.env.REGION,
      endpoint: 'http://localhost:8000',
    })
  : new DynamoDB.DocumentClient({ region: process.env.REGION })
