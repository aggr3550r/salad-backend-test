import { Router } from 'express';
import make from '../services/make';
import authenticated from '../middleware/is-authenticated.middleware';

/**
 * This is the custom app router which of course essentially creates a wrapper around the readily available Express Router to avail us more convenient interfaces for setting up our routes with facilities such as authentication and authorization.
 */

export default class ApiRouter {
  router;

  constructor() {
    this.router = Router();
  }

  /**
   * Creates a basic route and adds a pattern to it that results in it not needing authentication.
   * @param {*} method
   * @param {*} pattern
   * @param {*} controller
   * @param  {...any} mw
   */
  addPattern(method, pattern, controller, ...mw) {
    this.router[method](pattern, ...mw, make(controller));
  }

  /**
   * This method leverages the aforementioned convenient interfaces to apply our authentication middleware to the subject/target route.
   * @param {*} method
   * @param {*} pattern
   * @param {*} controller
   * @param  {...any} mw
   */
  addIsAuthenticatedPattern(method, pattern, controller, ...mw) {
    this.router[method](pattern, authenticated, ...mw, make(controller));
  }

  use(mw) {
    this.router.use(mw);
  }

  getExpressRouter() {
    return this.router;
  }
}

export const HttpMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
};
