const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5127;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Sample data array
let dataArray = [
  ["Apples", "5"],
  ["Lettuce", "3"],
  ["BBQ Sauce", "2"],
  ["Hair Spray", "555"],
];


  // const [rows, setRows] = useState([
  //   ["Apples", "5"],
  //   ["Lettuce", "3"],
  //   ["BBQ Sauce", "2"],
  //   ["Hair Spray", "1"],
  // ]);

const automotiveUSMarket = [
  // Key-Value pairs
  { TotalVehiclesSold: 14350000 },
  { TopSellingBrand: "Toyota" },
  { EVMarketShare: "7.1%" },
  { AverageVehiclePrice: "$48,500" },
  { TopSUVModel: "Honda CR-V" },

  // JSON Objects
  {
    ElectricVehicles: {
      Tesla: { Model3: 250000, ModelY: 310000 },
      Ford: { MustangMachE: 36000 },
    },
  },
  {
    PopularSegments: {
      Sedans: ["Toyota Camry", "Honda Accord", "Nissan Altima"],
      Trucks: ["Ford F-150", "Chevrolet Silverado", "RAM 1500"],
    },
  },
  {
    YearlyGrowth: {
      2022: "3.4%",
      2023: "2.8%",
      "2024_est": "4.1%",
    },
  },

  // Additional Key-Value pairs
  { HybridSalesGrowth: "18%" },
  { LuxuryBrandLeader: "BMW" },
];


// Routes
// Get all items
app.get("/api/items", (req, res) => {
  res.json(dataArray);
});

// Add a new item
app.post("/api/items", (req, res) => {
  const newItem = req.body.item;
  if (newItem) {
    dataArray.push(newItem);
    res
      .status(201)
      .json({
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
    res
      .status(200)
      .json({
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
