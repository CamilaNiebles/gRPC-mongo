const createOne = async function (data) {
  try {
    const document = await collection.insertOne(data)
    return document
  } catch (error) {
    console.log(`Error creating the item ${error}`)
  }
}

module.exports = {
  createOne
}
