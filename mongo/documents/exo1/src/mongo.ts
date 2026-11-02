import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products")

// Les produits de la catégorie "accessories" ayant au moins 20 unités en stock
const result = await products
  .find({
    "categories.id": "accessories",
    "stock.quantity": {
      $gte: 20
    }
  })
  .toArray();

console.dir(result, {depth: 10});

await client.close()