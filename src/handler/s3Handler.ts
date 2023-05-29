import 'reflect-metadata'

export const event = async (data: any): Promise<void> => {
  console.log(
    `Event S3 Event ${data.Records[0].eventName} 
    ${JSON.stringify(data, null, 2)}`,
  )
}
