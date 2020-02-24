const { Router } = require('express');

const router = Router();
const Post = require('../models/posts');

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
});


module.exports = router;
