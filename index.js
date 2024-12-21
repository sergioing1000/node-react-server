require("dotenv").config();
const { MongoClient } = require("mongodb");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5127;

const corsOptions = {
  origin: "https://zingy-frangollo-f59cf4.netlify.app", // Allow only your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Headers allowed in requests
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.options("*", cors(corsOptions)); // Handle preflight requests

app.use((req, res, next) => {
  console.log(`Request from origin: ${req.headers.origin}`);
  next();
});


// app.use("/api/items", (req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://zingy-frangollo-f59cf4.netlify.app"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }

//   next(); // Proceed to the next middleware or route handler
// });

let dataArray = []; // Initialize as an empty array

async function initializeDataArray() {
  try {
    dataArray = await run();
  } catch (error) {
    console.error("Error initializing data array:", error);
  }
}

async function startServer() {
  await initializeDataArray();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();

// Call this function to populate dataArray when the server starts
// initializeDataArray();

async function run() {

  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);


  try {

    console.log("here");

    await client.connect();

    const dbName = "DataBase";
    const collectionName = "Collection";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const documents = await collection.find({}).toArray();

    return documents.map((doc) => [
       doc["Description"],
       doc["Qty"].toString(),
    ]);
    
    
  } catch (err) {
    console.error("Error reading documents:", err);
    return []; // Return an empty array on error
  }
  finally {
    await client.close();
  }
}


async function saveDocuments(data) {

  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  const dbName = "DataBase";
  const collectionName = "Collection";

  try {
    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Delete all documents in the collection
    await collection.deleteMany({});
    console.log("All documents deleted.");

    const datatobePushed = [];

    for (let i = 0; i < data.rows.length; i++) {
      datatobePushed.push({
        Description: data.rows[i][0],
        Qty: data.rows[i][1],
      });
    }

    // Insert the new documents
    const result = await collection.insertMany(datatobePushed);

    console.log(`${result.insertedCount} documents inserted.`);
  } catch (error) {
    console.error("Error replacing documents:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

////////// ROUTES //////////
// Get all items
app.get("/", (req, res) => {
  const htmlresponse = '<html><head><title>Document</title></head><body><h2>Title</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi velit, eligendi nihil dolores odio deleniti officia labore veniam fuga quaerat totam voluptate dolore consectetur reiciendis error quos quae, fugit repellat.</p></body></html>';
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://zingy-frangollo-f59cf4.netlify.app"
  );
  res.send(htmlresponse);
});

app.get("/api/items", (req, res) => {
  if (!dataArray || dataArray.length === 0) {
    return res.status(404).json({ success: false, message: "No items found" });
  }
  res.status(200).json(dataArray);
});


// Save all items
app.post('/api/save', (req, res) => {
  // Access data sent from the frontend
  const data = req.body;

  saveDocuments(data);
  
  // Respond to the client
  res.status(201).json({
    message: "Data received successfully",
    receivedData: data,
  });
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
// 