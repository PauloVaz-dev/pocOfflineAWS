import 'reflect-metadata'

import { HttpResponse, success } from '../http'
import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { sqsClient } from '../commons/aws'

export const events = async (records: any): Promise<HttpResponse> => {
  console.log(`\x1b[33m Lambda events! \x1b[0m`)
  try {
    for (const { body } of records.Records) {
      const record = JSON.parse(body)

      console.log(
        `\x1b[33m Message received from SQS! ${JSON.stringify(record)} \x1b[0m`,
      )
    }
  } catch (error) {
    console.error(error)
  }
  return success()
}

export const create = async (data: any): Promise<HttpResponse> => {
  const { body } = data
  console.log('\x1b[33m Event Create! \x1b[0m')
  await enqueue(body)

  return success()
}

const enqueue = async (data: any): Promise<void> => {
  const command = new SendMessageCommand({
    QueueUrl: 'http://localhost:9324/queue/my-sqs',
    MessageBody: JSON.stringify(data),
  })
  await sqsClient.send(command)
}
