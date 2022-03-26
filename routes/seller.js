const express = require('express');
const path = require('path');
const multer = require('multer');

const {getAllRestaurants, getRestaurantsBySearch, getRestaurantById, updateRestaurant, addFoodItem, updateFoodItem, deleteFoodItem, sellerSignin, sellerSignup, deleteRestaurant, getRestaurantItems, getRestaurantItemsBySearch} = require('../controllers/seller.js');

const auth = require('../middleware/auth.js');

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +  file.originalname )
    }
}) 
const upload = multer({ storage: storage })


router.post('/upload', upload.single('coverPhoto') ,(req, res) => {
    res.send(req.file);
})


router.post('/signin',sellerSignin);
router.post('/signup',upload.single('coverPhoto') ,sellerSignup);

router.get('/',getAllRestaurants);
router.get('/search',getRestaurantsBySearch);
router.get('/:id',getRestaurantById);
router.get('/:id/items',getRestaurantItems);
router.get('/:id/items/search',getRestaurantItemsBySearch);


router.patch('/update/:id', upload.single('coverPhoto') , updateRestaurant)
router.delete('/delete/:id',deleteRestaurant);

router.patch('/:id/addFood', upload.single('picture') , addFoodItem);
router.patch('/:id/updateFood/:foodId', upload.single('picture') , updateFoodItem);
router.patch('/:id/deleteFood/:foodId',deleteFoodItem);


module.exports = router;