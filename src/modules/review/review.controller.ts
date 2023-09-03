import { HttpStatus } from '../../enums/http-status.enum';
import { SaladResponseMsg } from '../../enums/salad-response.enum';
import { ResponseModel } from '../../models/response.model';
import logger from '../../utils/logger.util';
import { UpdateReviewDTO } from './dtos/update-review.dto';
import ReviewService from './review.service';

const log = logger.getLogger();
export default class ReviewController {
  constructor(private reviewService: ReviewService) {}

  async createReview(request: any) {
    try {
      const { id: userId } = request.auth;
      const data = request.body;

      const serviceResponse = await this.reviewService.create(data, userId);

      return new ResponseModel(
        HttpStatus.CREATED,
        'Review uccessfully created.',
        serviceResponse
      );
    } catch (error) {
      log.error('createReview() error', error);
      throw new ResponseModel(
        error?.statusCode || 400,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async updateReview(request: any) {
    try {
      const { reviewId } = request.params;
      const data: UpdateReviewDTO = request.body;

      const serviceResponse = await this.reviewService.update(reviewId, data);

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully updated review.',
        serviceResponse
      );
    } catch (error) {
      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async deleteReview(request: any) {
    try {
      const { reviewId } = request.params;

      const serviceResponse = await this.reviewService.delete(reviewId);

      return new ResponseModel(HttpStatus.OK, 'Review successfully deleted.', {
        reviewId,
        serviceResponse,
      });
    } catch (error) {
      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async getAll(request: any) {
    try {
      const { submitterId } = request.params;
      const queryOptions = request.query;

      const serviceResponse = await this.reviewService.getAll(
        queryOptions,
        submitterId
      );

      return new ResponseModel(
        HttpStatus.OK,
        SaladResponseMsg.SUCCESS,
        serviceResponse
      );
    } catch (error) {
      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }
}
