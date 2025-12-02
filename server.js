require("dotenv").config();
const express = require("express");  
const cors = require("cors"); 
const cartsRoutes = require("./src/routes/cartsRoutes");
const userRoutes = require("./src/routes/userRoutes");
const user_addressesRoutes = require("./src/routes/user_addressesRoutes");
const categoriesRoutes = require("./src/routes/categoriesRoutes");
const cart_itemsRoutes = require("./src/routes/cart_itemsRoutes");
const branchesRoutes = require("./src/routes/branchesRoutes");
const productsRoutes = require("./src/routes/productsRoutes");
const featureProductRoutes = require("./src/routes/featureProductRoutes");
const orderRoutes = require("./src/routes/ordersRoutes");
const order_itemsRoutes = require("./src/routes/order_itemsRoutes");
const reviewRoutes = require("./src/routes/reviewsRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();  
app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const loginRoutes = require("./src/routes/loginRoutes");
app.use("/api", loginRoutes);


app.use("/api", cartsRoutes);
app.use("/api", userRoutes);
app.use("/api", user_addressesRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", cart_itemsRoutes);
app.use("/api", branchesRoutes);
app.use("/api", productsRoutes);
app.use("/api", featureProductRoutes);
app.use("/api", orderRoutes);
app.use("/api", order_itemsRoutes);
app.use("/api", reviewRoutes);
app.use("/api", adminRoutes);

const PORT = process.env.PORT || 4000;  

app.listen(PORT, () => {  
    console.log(`Espresso Stories ☕ http://localhost:${PORT}`);  
});