const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017'
const mongoClient = new MongoClient(uri)

const mongoInit = async function () {
  try {
    await mongoClient.connect()
    const database = mongoClient.db('blogDB')
    console.log(`Connection ON!`)
    database.collection('blog')
  } catch (error) {
    console.log(`Error in the database ${error}`)
  }
}

module.exports = mongoInit
