import { Repository, getRepository } from 'typeorm';
import { Review } from './entities/review.entity';
import logger from '../../utils/logger.util';
import { CreateReviewDTO } from './dtos/create-review.dto';
import { AppError } from '../../exceptions/AppError';
import { ResourceAlreadyExistsException } from '../../exceptions/ResourceAlreadyExistsException';
import { SaladResponseMsg } from '../../enums/salad-response.enum';
import { UpdateReviewDTO } from './dtos/update-review.dto';

const log = logger.getLogger();
export default class ReviewService {
  constructor(private reviewRepository: Repository<Review>) {
    this.reviewRepository = getRepository<Review>(Review);
  }

  async createReview(userId: string, data: CreateReviewDTO) {
    try {
      const { title } = data;
      const reviewAlreadyExists = this.findReviewByTitle(userId, title);

      if (reviewAlreadyExists)
        throw new ResourceAlreadyExistsException(
          "Sorry you can't have two reviews with the same title. Choose another title and try again."
        );

      const newReview = this.reviewRepository.create(data);
      return await this.reviewRepository.save(newReview);
    } catch (error) {
      log.error('createReview() error', error);
      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.status || 400
      );
    }
  }

  async findReviewbyId(userId: string, reviewId: string): Promise<Review> {
    try {
      const review = await this.reviewRepository.findOne({
        where: {
          id: reviewId,
          is_active: true,
          owner: { id: userId },
        },
      });

      return review;
    } catch (error) {
      log.error('findReviewById() error', error);
      throw new AppError('Error finding review with that id', 400);
    }
  }

  async findReviewByTitle(userId: string, title: string): Promise<Review> {
    try {
      const review = await this.reviewRepository.findOne({
        where: {
          title: title,
          is_active: true,
          owner: { id: userId },
        },
      });

      return review;
    } catch (error) {
      log.error('findReviewByTitle() error', error);
      throw new AppError('Error finding review with that title', 400);
    }
  }

  async updateReview(userId: string, reviewId: string, data: UpdateReviewDTO) {
    try {
      const user = await this.findReviewbyId(userId, reviewId);
      Object.assign(user, data);
      return await this.reviewRepository.save(user);
    } catch (error) {
      log.error('updateUser() error', error);
      throw new AppError(SaladResponseMsg.FAILED, 400);
    }
  }
}
