import { Repository, getRepository } from 'typeorm';
import { Review } from './entities/review.entity';
import logger from '../../utils/logger.util';
import { CreateReviewDTO } from './dtos/create-review.dto';
import { AppError } from '../../exceptions/AppError';

import { SaladResponseMsg } from '../../enums/salad-response.enum';
import { UpdateReviewDTO } from './dtos/update-review.dto';
import { IGenericAppService } from '../../interfaces/IGenericUserService';
import { PageOptionsDTO } from '../../paging/page-option.dto';
import { PageDTO } from '../../paging/page.dto';
import { PageMetaDTO } from '../../paging/page-meta.dto';

const log = logger.getLogger();
export default class ReviewService implements IGenericAppService<Review> {
  constructor(private reviewRepository: Repository<Review>) {
    this.reviewRepository = getRepository<Review>(Review);
  }

  async create(data: CreateReviewDTO, submitterId: string): Promise<Review> {
    try {
      const newReview = this.reviewRepository.create(data);
      newReview.submitterId = submitterId;
      newReview.pageId = data.pageId;
      return await this.reviewRepository.save(newReview);
    } catch (error) {
      log.error('createReview() error', error);
      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.status || 400
      );
    }
  }

  async findById(reviewId: string): Promise<Review> {
    try {
      const review = await this.reviewRepository.findOne({
        where: {
          id: reviewId,
          is_active: true,
        },
      });

      return review;
    } catch (error) {
      log.error('findReviewById() error', error);
      throw new AppError('Error finding review with that id', 400);
    }
  }

  async update(reviewId: string, data: UpdateReviewDTO) {
    try {
      const review = await this.findById(reviewId);
      Object.assign(review, data);
      return await this.reviewRepository.save(review);
    } catch (error) {
      log.error('updateReview() error', error);
      throw new AppError(SaladResponseMsg.FAILED, 400);
    }
  }

  async delete(reviewId: string): Promise<boolean> {
    try {
      const review = await this.findById(reviewId);
      if (!review) {
        return false;
      }

      const update: Partial<UpdateReviewDTO> = {
        is_active: false,
      };

      Object.assign(review, update);

      await this.reviewRepository.save(review);
      return true;
    } catch (error) {
      log.error('deleteReview() error', error);
      throw new AppError(SaladResponseMsg.FAILED, 400);
    }
  }

  async getAll(
    queryOptions: PageOptionsDTO,
    submitterId?: string
  ): Promise<PageDTO<Review>> {
    try {
      let [items, count] = await this.reviewRepository.findAndCount({
        where: {
          is_active: true,
          submitterId,
        },
        skip: queryOptions?.skip,
        take: queryOptions?.take,
      });

      const pageMetaDTO = new PageMetaDTO({
        page_options_dto: queryOptions,
        total_items: count,
      });

      return new PageDTO(items, pageMetaDTO);
    } catch (error) {
      log.error('getAllReviews() error', error);
      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.statusCode || 400
      );
    }
  }
}
