import { reviewController } from '../container';
import ApiRouter, { HttpMethod } from '../utils/api-router.util';

const reviewRouter = new ApiRouter();

reviewRouter.addIsAuthenticatedPattern(
  HttpMethod.POST,
  '/',
  reviewController.createReview.bind(reviewController)
);

reviewRouter.addIsAuthenticatedPattern(
  HttpMethod.PATCH,
  '/:reviewId',
  reviewController.updateReview.bind(reviewController)
);

reviewRouter.addIsAuthenticatedPattern(
  HttpMethod.DELETE,
  '/',
  reviewController.deleteReview.bind(reviewController)
);

reviewRouter.addIsAuthenticatedPattern(
  HttpMethod.GET,
  '/:submitterId',
  reviewController.getAll.bind(reviewController)
);
