const { Router } = require('express');
const PostController = require('../controllers/posts');


const router = Router();

// /* GET index page. */
// router.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Express'
//   });
// });

router.post('/post', PostController.send_post);

module.exports = router;
