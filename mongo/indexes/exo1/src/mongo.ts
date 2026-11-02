import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products")

await products.createIndex({ "categories.id": 1 });

const filter = { "categories.id": "accessories" };

const result = await products.find(filter).toArray();

console.log(result);

const explain = await products.find(filter).explain("executionStats");

console.log(JSON.stringify(explain.queryPlanner.winningPlan, null, 2));
console.log({
  nReturned: explain.executionStats.nReturned,
  totalKeysExamined: explain.executionStats.totalKeysExamined,
  totalDocsExamined: explain.executionStats.totalDocsExamined,
});

await client.close()