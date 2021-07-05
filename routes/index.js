const router = require('express').Router();


const html = require('./home-routes');
const api = require('./api');

router.use('/', html);
router.use('/api', api);

module.exports = router;