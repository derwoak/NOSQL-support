import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products")

await products.updateOne(
  { _id: new ObjectId("6ac4f251f56c19b1910c1e31") },
  {
    $set: {
      "stock.quantity": 8,
    },
  },
);

const result = await products.find().toArray();

console.log(result);

await client.close()