/**
 * This file serves as the dependency injection (DI) container for the application.
 *  NestJS creates something like this for us on its own when our application bootstraps so we don't have to but we have to do it manually in Express.
 */

import { Repository, getRepository } from 'typeorm';
import { User } from '../modules/user/entities/user.entity';
import { Page } from '../modules/page/entites/page.entity';
import { Review } from '../modules/review/entities/review.entity';
import { Staff } from '../modules/staff/entities/staff.entity';
import UserService from '../modules/user/user.service';
import { PageService } from '../modules/page/page.service';
import ReviewService from '../modules/review/review.service';
import { StaffService } from '../modules/staff/staff.service';
import UserController from '../modules/user/user.controller';
import { PageController } from '../modules/page/page.controller';
import ReviewController from '../modules/review/review.controller';
import { StaffController } from '../modules/staff/staff.controller';
import AuthController from '../modules/user/auth/auth.controller';
import AuthService from '../modules/user/auth/auth.service';

/**
 * @author aggr3550r
 */

/* REPOSITORIES */

const userRepository: Repository<User> = getRepository<User>(User);
const pageRepository: Repository<Page> = getRepository<Page>(Page);
const reviewRepository: Repository<Review> = getRepository<Review>(Review);
const staffRepository: Repository<Staff> = getRepository<Staff>(Staff);

/* SERVICES */

const userService: UserService = new UserService(userRepository);
const pageService: PageService = new PageService(pageRepository);
const reviewService: ReviewService = new ReviewService(reviewRepository);
const staffService: StaffService = new StaffService(staffRepository);
const authService: AuthService = new AuthService(userService);

/* CONTROLLERS */

export const userController: UserController = new UserController(userService);
export const pageController: PageController = new PageController(pageService);
export const reviewController: ReviewController = new ReviewController(
  reviewService
);
export const staffController: StaffController = new StaffController(
  staffService
);
export const authController: AuthController = new AuthController(authService);

