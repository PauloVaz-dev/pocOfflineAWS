import 'reflect-metadata'
import { dynamoDbClient } from '../commons/aws'

export const create = async (data: any): Promise<void> => {
  console.log(`Create Dynamo`)
  const { solicitationId } = JSON.parse(data.body)
  await put({
    id: solicitationId,
    date: String(new Date()),
  })
}

export const event = async (data: any): Promise<void> => {
  console.log(`Event Dynamo ${JSON.stringify(data, null, 2)}`)
}

const put = async (data: any): Promise<void> => {
  console.log(`send to dynamo ${JSON.stringify(data, null, 2)}`)
  try {
    await dynamoDbClient
      .put({
        TableName: String(process.env.DYNAMO_SCHEDULE_TABLE),
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
