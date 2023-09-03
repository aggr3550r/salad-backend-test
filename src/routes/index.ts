import authRouter from './auth';
import userRouter from './user';
import reviewRouter from './review';
import pageRouter from './page';
import staffRouter from './staff';

const router = require('express').Router();

router.get('/healthy', (req: any, res: any) => {
  return res.sendStatus(200);
});

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/reviews', reviewRouter);
router.use('/pages', pageRouter);
router.use('staff', staffRouter);

export default router;
