require("dotenv").config();
const { MongoClient } = require("mongodb");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5127;

// Middleware
app.use(cors());
app.use(bodyParser.json());

async function run() {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  await client.connect();

  const dbName = "DataBase";
  const collectionName = "Collection";

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  try {
    const documents = await collection.find({}).toArray();

    const convertToDataArray = (documents) => {
      return documents.map((doc) => [
        doc["Description"],
        doc["Qty"].toString(),
      ]);
    };

    let dataArr = convertToDataArray(documents);

    return Array.from(dataArr);
  } catch (err) {
    console.error("Error reading documents:", err);
  }

  await client.close();
}

const dataArray = run().catch();

// let dataArray = run().catch();
// console.log("##### dataArray: #####");
// console.log(dataArray);

// Sample data array
let dataArray2 = [
  ["Apples", "5"],
  ["Lettuce", "3"],
  ["BBQ Sauce", "2"],
  ["Hair Spray", "5"],
];




// Routes
// Get all items
app.get("/api/items", (req, res) => {
  console.log("first")
  console.log(dataArray);
  res.status(202).json(dataArray);
});

// Add a new item
app.post("/api/items", (req, res) => {
  const newItem = req.body.item;
  if (newItem) {
    dataArray.push(newItem);
    res.status(201).json({
      success: true,
      message: "Item added successfully",
      data: dataArray,
    });
  } else {
    res.status(400).json({ success: false, message: "Item is required" });
  }
});

// Delete an item
app.delete("/api/items/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < dataArray.length) {
    dataArray.splice(index, 1);
    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: dataArray,
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid index" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
