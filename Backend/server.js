const express = require('express');
const mysql = require("mysql");
const cors = require('cors');

const app = express();
app.use(cors())

app.use(express.json());


const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "finallab_db"
});
app.get('/', (re, res) => {
    return res.json("From Backend Side");
}) 

app.get('/')

app.get('/tbl_accounts', (req, res) => {
    const sql = "SELECT * FROM tbl_accounts";
    db.query (sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.post('/signup', (req, res) => {
    const {accName, password} = req.body;
    const sql = "INSERT INTO tbl_accounts(accName, password) VALUES (?,?)";
    db.query(sql, [accName, password], (err, result) => {
        if (err) return res.status(500).json({error: err});
        return res.json({message: "Signup successful"});
    });
});

app.post("/add-product", (req, res) => {
  const {
    productName,
    category,
    variety,
    unitMeasure,
    availableQuantity,
  } = req.body;

  console.log("Received:", req.body); // Debugging line

  // Validate input
  if (!productName || !category || !variety || !unitMeasure || !availableQuantity) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    INSERT INTO tbl_products 
    (product_name, product_category, product_variety, unit_measure, avail_qty) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [productName, category, variety, unitMeasure, availableQuantity],
    (err, result) => {
      if (err) {
        console.error("Insert error:", err); // This is what you need to check
        return res.status(500).json({ error: "Failed to add product." });
      }
      return res.json({ message: "Product added successfully!" });
    }
  );
});

// Endpoint to fetch all products
app.get("/get-products", (req, res) => {
  const sql = "SELECT * FROM tbl_products"; // SQL query to fetch all products

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Failed to fetch products." });
    }

    return res.json({ products: result });
  });
});

app.put("/update-product/:id", (req, res) => {
  const { id } = req.params;
  const { productName, category, variety, unitMeasure, availableQuantity } = req.body;

  if (!productName || !category || !variety || !unitMeasure || !availableQuantity) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    UPDATE tbl_products
    SET product_name = ?, product_category = ?, product_variety = ?, unit_measure = ?, avail_qty = ?
    WHERE product_id = ?
  `;

  db.query(
    sql,
    [productName, category, variety, unitMeasure, availableQuantity, id],
    (err, result) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ error: "Failed to update product." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found." });
      }

      return res.json({ message: "Product updated successfully!" });
    }
  );
});

app.delete("/delete-product/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tbl_products WHERE product_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Failed to delete product." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json({ message: "Product deleted successfully!" });
  });
});




app.listen(8801, ()=> {
    console.log("listening");
})