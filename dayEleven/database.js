const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
//username=code_hunter9,password=code_hunter@@&&11,cluster=%40codingadda.rj5jhg8.mongodb.net/
//above code we are replase @ to their ASSCI code (%40)<<{this is hexadecemal value}
const url =
// "mongodb+srv://code_hunter9:code_hunter%40%40%26%2611@codingadda.rj5jhg8.mongodb.net/";
"mongodb://localhost:27017"
const client = new MongoClient(url);

// Database Name
const dbName = "code_hunter";

async function main() {
  // Use connect method to connect to the server
await client.connect();
console.log("Connected successfully to server");
const db = client.db(dbName);
const collection = db.collection("user_f");

  // the following code examples can be pasted here...



//   const findResult = await collection.find({}).toArray();
// console.log('Found documents =>', findResult);
//{try other way to get our data}
// const findD=collection.find({});
// const ans=await findD.toArray();
// console.log(ans);
//{try other way to get our data}
const findD1=collection.find({});
for await(const ans of findD1)
console.log(ans);




const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
console.log('Updated documents =>', updateResult);

// const deleteResult = await collection.deleteMany({ a: 3 });
// console.log('Deleted documents =>', deleteResult);

// const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
// console.log('Inserted documents =>', insertResult);


return "done.";
}
main().then(console.log).catch(console.error).finally(() => client.close());

// const url="mongodb+srv://code_hunter9:code_hunter@@&&11@codingadda.rj5jhg8.mongodb.net/";