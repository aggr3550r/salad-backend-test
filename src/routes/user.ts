import { userController } from '../container';
import ApiRouter, { HttpMethod } from '../utils/api-router.util';

const userRouter = new ApiRouter();

userRouter.addPattern(
  HttpMethod.PATCH,
  '/:userId',
  userController.updateUser.bind(userController)
);

userRouter.addPattern(
  HttpMethod.DELETE,
  '/:userId',
  userController.deleteUser.bind(userController)
);

userRouter.addPattern(
  HttpMethod.GET,
  '/:userId',
  userController.getUser.bind(userController)
);

userRouter.addPattern(
  HttpMethod.GET,
  '/',
  userController.getAllUsers.bind(userController)
);

export default userRouter.getExpressRouter();
