const multer = require("multer");
const path = require("path");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "finallab_db",
});
app.get("/", (re, res) => {
  return res.json("From Backend Side");
});

app.get("/tbl_accounts", (req, res) => {
  const sql = "SELECT * FROM tbl_accounts";
  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.post("/signup", (req, res) => {
  const { fName, lName, accName, email, password } = req.body;
  const sql =
    "INSERT INTO tbl_accounts(fName, lName, accName, email, password, created_At, updated_At) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
  db.query(sql, [fName, lName, accName, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: "Signup successful" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM tbl_accounts WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length > 0) {
      return res.json({
        message: "Login successful",
        accID: result[0].accID,
        accName: result[0].accName,
        email: result[0].email,
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

app.get("/products-by-category/:category", (req, res) => {
  const { category } = req.params;
  const sql = "SELECT * FROM tbl_products WHERE product_category = ? AND status = 'Y'";
  db.query(sql, [category], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ products: result });
  });
});

app.post("/google-login", (req, res) => {
  const { fName, lName, accName, email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  // Check if user exists
  const checkSql = "SELECT * FROM tbl_accounts WHERE email = ?";
  db.query(checkSql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0) {
      // User exists, return info
      const user = result[0];
      return res.json({
        message: "Login successful",
        accID: user.accID,
        accName: user.accName,
        email: user.email,
      });
    } else {
      // User does not exist, create new
      const insertSql =
        "INSERT INTO tbl_accounts(fName, lName, accName, email, password) VALUES (?,?,?,?,?)";
      db.query(
        insertSql,
        [fName, lName, accName, email, ""],
        (err, insertResult) => {
          if (err) return res.status(500).json({ error: err });
          // Get the new user
          const newUserSql = "SELECT * FROM tbl_accounts WHERE email = ?";
          db.query(newUserSql, [email], (err, newUserResult) => {
            if (err) return res.status(500).json({ error: err });
            const user = newUserResult[0];
            return res.json({
              message: "Login successful",
              accID: user.accID,
              accName: user.accName,
              email: user.email,
            });
          });
        }
      );
    }
  });
});

// Get products by accID (from query param)
// 📦 Get products by accID
// Get products (only active status 'Y')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../finallab/src/assets")); // fixed path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});


const upload = multer({ storage });

const pathToAssets = path.join(__dirname, "../finallab/src/assets");
app.use("/assets", express.static(pathToAssets));

// Get trending products
app.get("/get-trending-products", (req, res) => {
  const query = `
    SELECT 
      product_id, 
      product_name, 
      price, 
      image_url 
    FROM tbl_products 
    WHERE status = 'Y'
    ORDER BY price ASC
    LIMIT 6
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching trending products:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ products: results });
  });
});



// GET products by accID
app.get("/get-products", (req, res) => {
  const accID = req.query.accID;
  if (!accID) return res.status(400).json({ error: "accID is required" });

  const sql = "SELECT * FROM tbl_products WHERE accID = ? AND status = 'Y'";
  db.query(sql, [accID], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ products: result });
  });
});

// ADD product (with image upload)
app.post("/add-product", upload.single("image"), (req, res) => {
  const {
    productName,
    category,
    unitMeasure,
    availableQuantity,
    price,
    accID,
  } = req.body;

  if (
    !accID ||
    !productName ||
    !category ||
    !unitMeasure ||
    availableQuantity === undefined ||
    price === undefined
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let imageUrl = null;
  if (req.file) {
    imageUrl = `/assets/${req.file.filename}`;
  }

  const sql = `
    INSERT INTO tbl_products
    (product_name, product_category, unit_measure, avail_qty, price, image_url, accID, status, created_At, updated_At)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Y', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  db.query(
    sql,
    [
      productName,
      category,
      unitMeasure,
      availableQuantity,
      price,
      imageUrl,
      accID,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      return res.status(201).json({ message: "Product added successfully" });
    }
  );
});

// UPDATE product (with optional image upload)
app.put("/update-product/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const {
    productName,
    category,
    unitMeasure,
    availableQuantity,
    price,
  } = req.body;

  if (
    !productName ||
    !category ||
    !unitMeasure ||
    availableQuantity === undefined ||
    price === undefined
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // If an image file uploaded, set imageUrl, else keep current imageUrl from req.body (or null)
  let imageUrl = req.body.imageUrl || null;
  if (req.file) {
    imageUrl = `/assets/${req.file.filename}`;
  }

  const sql = `
    UPDATE tbl_products
    SET
      product_name = ?,
      product_category = ?,
      unit_measure = ?,
      avail_qty = ?,
      price = ?,
      image_url = ?,
      updated_At = NOW()
    WHERE product_id = ? AND status = 'Y'
  `;

  db.query(
    sql,
    [
      productName,
      category,
      unitMeasure,
      availableQuantity,
      price,
      imageUrl,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      return res.json({ message: "Product updated successfully" });
    }
  );
});

// DELETE (soft delete) product by setting status = 'N'
app.delete("/delete-product/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE tbl_products
    SET status = 'N', updated_At = NOW()
    WHERE product_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: "Product deleted successfully" });
  });
});

app.listen(8801, () => {
  console.log("listening");
});
