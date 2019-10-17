const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const cors = require('cors');


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
    name: req.body.name,
    price: req.body.price
  });

  newFood.save().then(food => res.json(food));
});

// @route   PUT api/items/:id
// @desc    Edit A Item
// @access  Private
router.put("/:id", auth, (req, res, next) => {
  Food.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(food => {
      food.name = req.body.name;
      food.price = req.body.price;
      food.updateOne(req.body).then(() => res.json({ message: "Product Created" }))
    })
    .catch(err => res.status(400).json({ message: "Something went wrong" }));
});

// router.put('/:id', auth).post((req, res) => {
//   Food.findById(req.params.id)
//       .then(food => {
//         food.name = req.body.name;
//         food.price = req.body.price;
//
//         food.save()
//             .then(() => res.json('Okay'))
//             .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
// });

// router.put("/:id", auth, (req, res) => {
//   Food.findByIdAndUpdate({ _id: req.params.id }, req.body)
//       .then(food => {
// food.name = req.body.name;
// food.price = req.body.price;
//           food.updateOne(req.body).then(() => res.json({ message: "Food updated" }))
//       })
//       .catch(err => res.status(400).json({ message: "Something went wrong" }));
// });

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Food.findById(req.params.id)
    .then(food => food.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});



module.exports = router;
