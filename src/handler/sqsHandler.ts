import 'reflect-metadata'

import { HttpResponse, success } from '../http'
import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { sqsClient } from '../commons/aws'

export const events = async (records: any): Promise<HttpResponse> => {
  console.log('Lambda events create-schedule')
  try {
    for (const { body } of records.Records) {
      const record = JSON.parse(body)

      console.log('message received from SQS', record)
    }
  } catch (error) {
    console.error(error)
  }
  return success()
}

export const create = async (data: any): Promise<HttpResponse> => {
  const { body } = data
  console.log('Lambda create-schedule')
  await enqueue(body)

  return success()
}

const enqueue = async (data: any): Promise<void> => {
  const command = new SendMessageCommand({
    QueueUrl: 'http://localhost:9324/queue/messaging-schedule-events',
    MessageBody: JSON.stringify(data),
  })
  await sqsClient.send(command)
}
