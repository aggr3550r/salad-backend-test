import { authController } from '../container';
import ApiRouter, { HttpMethod } from '../utils/api-router.util';

const authRouter = new ApiRouter();

authRouter.addPattern(
  HttpMethod.POST,
  '/login',
  authController.login.bind(authController)
);

authRouter.addPattern(
  HttpMethod.POST,
  '/signup',
  authController.signup.bind(authController)
);

export default authRouter.getExpressRouter();
