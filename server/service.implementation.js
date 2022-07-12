const grpc = require('@grpc/grpc-js')
const grpc_pb = require('../proto/blog_pb')
const { createOne } = require('./mongo/transactions')

function blogToDocument(blog) {
  return {
    author_id: blog.getAuthorId(),
    title: blog.getTitle(),
    content: blog.getContent()
  }
}

function documentToBlog(doc) {
  return new grpc_pb.Blog()
    .setId(doc._id.toString())
    .setAuthorId(doc.author_id)
    .setTitle(doc.title)
    .setContent(doc.content)
}

const internal = (err, callback) =>
  callback({
    code: grpc.status.INTERNAL,
    message: err.toString()
  })

function checkNotAcknowledged(res, callback) {
  if (!res.acknowledged) {
    callback({
      code: grpc.status.INTERNAL,
      message: `Operation wasn\'t acknowledged`
    })
  }
}

exports.createBlog = async (call, callback) => {
  const data = blogToDocument(call.request)
  const document = await createOne(data)
  checkNotAcknowledged(document, callback)
  const { insertedId } = document
  const blogId = new grpc_pb.BlogId().setId(insertedId)
  callback(null, blogId)
}
