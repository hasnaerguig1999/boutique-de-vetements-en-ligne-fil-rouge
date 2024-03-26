import Product from '../models/productsModel';
import Category from '../models/categoriesModel'


// Create a new product
const createProduct = async (req, res) => {
  try {
    const { categoryId, ...rest } = req.body;
    const product = await Product.create({ categoryId, ...rest });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['name'] }]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a product by id
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id: id } });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {id: _id, ...rest } = req.body;
    const [updated] = await Product.update(rest, { where: { id: id } });
    if (updated) {
      const updatedProduct = await Product.findOne({ where: { id: id } });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product's category
const updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId } = req.body;
    const [updated] = await Product.update({ categoryId }, { where: { id: id } });
    if (updated) {
      const updatedProduct = await Product.findOne({ where: { id: id }, include: [{ model: Category, attributes: ['name'] }] });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({
      where: { id: id }
    });

    if (deleted) {
      res.status(204).send("Product deleted");
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct, updateProductCategory };