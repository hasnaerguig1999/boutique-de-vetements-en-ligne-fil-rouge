import Category from '../models/categoriesModel';
import { body, validationResult } from 'express-validator';


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategory = async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const validateCategory = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('image').notEmpty().withMessage('Image is required'),
  ];

  const createCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


 const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name, description,image } = req.body;
  
    try {
      const category = await Category.findByPk(categoryId);
      
      if (!category) {
        return res.status(404).json({ message: "La catégorie n'a pas été trouvée." });
      }
  
      // Mettre à jour les attributs de la catégorie
      category.name = name;
      category.description = description;
      category.image = image
  
      await category.save();
  
      res.status(200).json({ message: 'Catégorie mise à jour avec succès.', category });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la catégorie.' });
    }
  };

  const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Category.destroy({
        where: { id: id }
      });
  
      if (deleted) {
        res.status(204).send("Category deleted");
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

export { getAllCategories,getCategory ,createCategory,updateCategory,deleteCategory,validateCategory};