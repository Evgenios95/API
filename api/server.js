import express from 'express'
import ProductsRoutes from './Products/ProductsRoutes.js'
import UsersRoutes from './Users/UserRoutes.js'
const app = express();
app.use(express.json());

//route for the products + custom
app.use('/api/products',ProductsRoutes);
//route for the users + custom
app.use('/api/users',UsersRoutes);

const PORT = 3000;
app.listen(PORT,console.log(`app is running on port ${PORT}!`));