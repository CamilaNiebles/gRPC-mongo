const grpc = require('@grpc/grpc-js')
const grpc__ = require('../proto/blog_grpc_pb')
const grpc_pb = require('../proto/blog_pb')

const address = 'localhost:5000'
function createBlog(client) {
  console.log('---createBlog was invoked---')
  return new Promise((resolve, reject) => {
    const req = new grpc_pb.Blog()
      .setAuthorId('Camila')
      .setTitle('This is the title')
      .setContent('Content of the first blog')

    client.createBlog(req, (err, res) => {
      if (err) {
        reject(err)
      }
      console.log(`Blog was created: ${res}`)
      resolve(res.getId())
    })
  })
}

async function main() {
  const credentials = grpc.ChannelCredentials.createInsecure()
  const client = new grpc__.BlogServiceClient(address, credentials)
  const id = await createBlog(client)
  client.close()
}

main()
