const { accaunt, addpost } = require('../controller/accaunt.controller');


const router = require('express').Router();

router.get('/api/accaunt', accaunt );
router.post('/api/accaunt/addpost', addpost);


module.exports = router;