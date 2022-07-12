const grpc = require('@grpc/grpc-js')
// const { GreetSeviceService } = require('../proto/greet_grpc_pb')
const mongoInit = require('./mongo/mongo.configuration')
const serviceImplementation = require('./service.implementation')

const address = 'localhost:5000'

async function cleanUp(server) {
  console.log('CleanUp')
  server && server.forceShutdown()
}

async function main() {
  const server = new grpc.Server()
  const credentials = grpc.ServerCredentials.createInsecure()
  await mongoInit()
  /** Check event that interrupt the execution */
  process.on('SIGINT', () => {
    console.log(`Caught interrupt signal`)
    cleanUp(server)
  })

  /** Add a specific service to the server. */
  //   server.addService(GreetSeviceService, serviceImplementation)

  server.bindAsync(address, credentials, (error, _) => {
    error ? cleanUp(server) : server.start()
  })
  console.log(`listen in ${address}`)
}

main().catch(cleanUp)
