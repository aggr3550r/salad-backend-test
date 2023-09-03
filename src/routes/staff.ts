import { staffController } from '../container';
import ApiRouter, { HttpMethod } from '../utils/api-router.util';

const staffRouter = new ApiRouter();

staffRouter.addPattern(
  HttpMethod.POST,
  '/',
  staffController.createStaff.bind(staffController)
);

staffRouter.addIsAuthenticatedPattern(
  HttpMethod.PATCH,
  '/',
  staffController.updateStaff.bind(staffController)
);

staffRouter.addIsAuthenticatedPattern(
  HttpMethod.GET,
  '/',
  staffController.getAllStaff.bind(staffController)
);

export default staffRouter.getExpressRouter();
