require("dotenv").config();
const { MongoClient } = require("mongodb");

const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "https://wish-list-apeh.vercel.app",
  // origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin","https://wish-list-apeh.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204); // No content
});



app.use((req, res, next) => {
  console.log(`Request from origin: ${req.headers.origin}`);
  next();
});

app.use((req, res, next) => {
  console.log("Preflight Request Headers:", req.headers);
  next();
});

let dataArray = [];

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

    console.log("here2");

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

  console.log(data)

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

app.get("/", (req, res) => {
  const htmlresponse = '<html><head><title>Document</title></head><body><h2>Title</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi velit, eligendi nihil dolores odio deleniti officia labore veniam fuga quaerat totam voluptate dolore consectetur reiciendis error quos quae, fugit repellat.</p></body></html>';
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://wish-list-apeh.vercel.app",
    // "http://localhost:5173"
  );
  res.send(htmlresponse);
});

// app.post("/", (req, res) => {
//   const htmlresponse =
//     "<html><head><title>Document</title></head><body><h2>Title</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi velit, eligendi nihil dolores odio deleniti officia labore veniam fuga quaerat totam voluptate dolore consectetur reiciendis error quos quae, fugit repellat.</p></body></html>";
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://wish-list-apeh.vercel.app",
//     // "http://localhost:5173"
//   );
//   res.send(htmlresponse);
// });

// Get all items
app.get("/api/items", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://wish-list-apeh.vercel.app",
    // "http://localhost:5173"
  );
  if (!dataArray || dataArray.length === 0) {
    return res.status(404).json({ success: false, message: "No items found" });
  }
  res.status(200).json(dataArray);
});


app.post("/api/save", async (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin", 
    "https://wish-list-apeh.vercel.app",
    // "http://localhost:5173"
    );
    res.setheader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setheader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

  const data = req.body;

  try {
    // Save the documents to the database
    await saveDocuments(data);

    // Re-initialize dataArray with the updated data
    await initializeDataArray();

    // Respond to the client
    res.status(201).json({
      message: "Data Updated successfully",
      receivedData: data,
    });
  } catch (error) {
    console.error("Error in /api/save:", error);
    res.status(500).json({
      message: "Error updating data",
      error: error.message,
    });
  }
});



// Add a new item
// app.post("/api/items", (req, res) => {
//   const newItem = req.body.item;
//   if (newItem) {
//     dataArray.push(newItem);
//     res.status(201).json({
//       success: true,
//       message: "Item added successfully",
//       data: dataArray,
//     });
//   } else {
//     res.status(400).json({ success: false, message: "Item is required" });
//   }
// });

// Delete an item
// app.delete("/api/items/:index", (req, res) => {
//   const index = parseInt(req.params.index, 10);
//   if (index >= 0 && index < dataArray.length) {
//     dataArray.splice(index, 1);
//     res.status(200).json({
//       success: true,
//       message: "Item deleted successfully",
//       data: dataArray,
//     });
//   } else {
//     res.status(400).json({ success: false, message: "Invalid index" });
//   }
// });
// 