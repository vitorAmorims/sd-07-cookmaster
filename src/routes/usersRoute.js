const router = require('express').Router();

router.route('/')
  .get()
  .post()
  .put()
  .delete();

router.route('/admin')
  .get()
  .post()
  .put()
  .delete();

module.exports = router;
