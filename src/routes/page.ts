import { pageController } from '../container';
import ApiRouter, { HttpMethod } from '../utils/api-router.util';

const pageRouter = new ApiRouter();

pageRouter.addIsAuthenticatedPattern(
  HttpMethod.POST,
  '/',
  pageController.createPage.bind(pageController)
);

pageRouter.addIsAuthenticatedPattern(
  HttpMethod.PATCH,
  '/:pageId',
  pageController.updatePage.bind(pageController)
);

pageRouter.addIsAuthenticatedPattern(
  HttpMethod.DELETE,
  '/:pageId',
  pageController.deletePage.bind(pageController)
);

pageRouter.addIsAuthenticatedPattern(
  HttpMethod.GET,
  '/',
  pageController.getAllPages.bind(pageController)
);

pageRouter.addIsAuthenticatedPattern(
  HttpMethod.GET,
  '/:pageId/info',
  pageController.viewPageInfo.bind(pageController)
);

pageRouter.addIsAuthenticatedPattern(
  HttpMethod.PUT,
  '/:pageId/rate',
  pageController.ratePage.bind(pageController)
);

pageRouter.addIsAuthenticatedPattern(
  HttpMethod.PATCH,
  '/:pageId/like',
  pageController.likePage.bind(pageController)
);

export default pageRouter.getExpressRouter();
