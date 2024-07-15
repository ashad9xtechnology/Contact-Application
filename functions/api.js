const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ashadashraf10:PhhFUEIksePCQ0Ae@cluster0.agqoc6b.mongodb.net/contactDB";

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db('contacts');
  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  try {
    const db = await connectToDatabase();
    const collection = db.collection('contacts');

    if (event.httpMethod === 'GET') {
      const contacts = await collection.find({}).toArray();
      return {
        statusCode: 200,
        body: JSON.stringify(contacts),
      };
    } else if (event.httpMethod === 'POST') {
      const contact = JSON.parse(event.body);
      await collection.insertOne(contact);
      return {
        statusCode: 201,
        body: JSON.stringify(contact),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to perform operation' }),
    };
  }
};