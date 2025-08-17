const {Router}=require('express');
const router=Router()
const {generateShortUrl}=require('../controllers/url.controller.js');
router.post('/CreateShortUrl',generateShortUrl)
module.exports = router