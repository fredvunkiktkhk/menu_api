const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Food = require('../../models/Food');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Food.find()
    .sort({ date: -1 })
    .then(food => res.json(food));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
  const newFood = new Food({
    name: req.body.name
  });

  newFood.save().then(food => res.json(food));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Food.findById(req.params.id)
    .then(food => food.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

router.put("/:id", auth, (req, res) => {
  Food.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(food =>
          food.updateOne().then(() => res.json({ message: "Food updated" }))
      )
      .catch(err => res.status(400).json({ message: "Something went wrong" }));
});

module.exports = router;
