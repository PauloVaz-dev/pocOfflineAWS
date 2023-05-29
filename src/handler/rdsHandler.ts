import 'reflect-metadata'

export const event = async (data: any): Promise<void> => {
  console.log(`Event S3 ${JSON.stringify(data, null, 2)}`)
}
