import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products")

const result = await products
  .find({
    "variants": {
      $elemMatch: {
        price: { $lt: 1600 },
        stock: { $gt: 0},
      },
    },
  })
  .toArray();

console.dir(result, {depth: 10});

await client.close()