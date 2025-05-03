const router = import('express').Router();
module.exports = router;

router.use('/products', import('./products'));


router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
