import 'reflect-metadata'
import { dynamoDbClient } from '../commons/aws'

export const create = async (data: any): Promise<void> => {
  console.log(`\x1b[33m Create Dynamo! ${data.body} \x1b[0m`)
  const { solicitationId } = JSON.parse(data.body)
  await put({
    id: solicitationId,
    date: String(new Date().toISOString()),
  })
}

export const event = async (data: any): Promise<void> => {
  console.log(
    `\x1b[33m Event Dynamo!  ${JSON.stringify(data, null, 2)} \x1b[0m`,
  )
}

const put = async (data: any): Promise<void> => {
  console.log(`\x1b[33m Send Dynamo!  ${JSON.stringify(data, null, 2)} \x1b[0m`)
  try {
    await dynamoDbClient
      .put({
        TableName: 'my-dynamo',
        Item: data,
      })
      .promise()
  } catch (err) {
    console.error(
      `Erro ao enviar para dynamo data: ${JSON.stringify(data, null, 2)}`,
      err,
    )
  }
}
