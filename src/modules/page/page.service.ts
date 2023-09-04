import { FindOneOptions, Repository, getRepository } from 'typeorm';
import { Page } from './entites/page.entity';
import { CreatePageDTO } from './dtos/create-page.dto';
import logger from '../../utils/logger.util';
import { AppError } from '../../exceptions/AppError';
import { ResourceAlreadyExistsException } from '../../exceptions/ResourceAlreadyExistsException';
import { UpdatePageDTO } from './dtos/update-page.dto';
import { SaladResponseMsg } from '../../enums/salad-response.enum';
import { ResourceNotFoundException } from '../../exceptions/ResourceNotFound';
import { RatingDTO } from './dtos/rating.dto';
import { PageOptionsDTO } from '../../paging/page-option.dto';
import { PageDTO } from '../../paging/page.dto';
import { PageMetaDTO } from '../../paging/page-meta.dto';
import { IGenericAppService } from '../../interfaces/IGenericUserService';
import { Like } from './entites/like.entity';
import { Rating } from './entites/rating.entity';

const log = logger.getLogger();
export class PageService implements IGenericAppService<Page> {
  constructor(
    private pageRepository: Repository<Page>,
    private likeRepository: Repository<Like>,
    private ratingRepository: Repository<Rating>
  ) {
    this.pageRepository = getRepository<Page>(Page);
    this.likeRepository = getRepository<Like>(Like);
    this.ratingRepository = getRepository<Rating>(Rating);
  }

  async create(data: CreatePageDTO): Promise<Page> {
    try {
      const options: FindOneOptions<Page> = {
        where: {
          name: data.name,
          is_active: true,
        },
      };

      const pageAlreadyExists = await this.pageRepository.findOne(options);

      if (pageAlreadyExists) {
        throw new ResourceAlreadyExistsException(
          'Page with that name already exists. Choose another.'
        );
      }

      const newPage = this.pageRepository.create(data);
      return await this.pageRepository.save(newPage);
    } catch (error) {
      log.error('createPage() error', error);

      throw new AppError(
        error?.message || 'Error creating page.',
        error?.statusCode || 400
      );
    }
  }

  async update(pageId: string, data: Partial<Page>): Promise<Page> {
    try {
      const page = await this.findById(pageId);
      Object.assign(page, data);
      return await this.pageRepository.save(page);
    } catch (error) {
      log.error('updatePage() error', error);

      throw new AppError(
        error?.message || 'Error updating page.',
        error?.statusCode || 400
      );
    }
  }

  async findById(pageId: string, withException: boolean = true): Promise<Page> {
    try {
      const options: FindOneOptions<Page> = {
        where: {
          id: pageId,
          is_active: true,
        },
      };

      const page = await this.pageRepository.findOne(options);

      if (!page && withException) {
        throw new ResourceNotFoundException();
      }

      return page;
    } catch (error) {
      log.error('findUserById() error', error);
      throw new AppError(
        error?.message || 'Unable to find page with that id',
        error?.status || 400
      );
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const page = await this.findById(id);
      if (!page) {
        return false;
      }

      const update: Partial<UpdatePageDTO> = {
        is_active: false,
      };

      await this.update(id, update);
      return true;
    } catch (error) {
      log.error('deletePage() error', error);
      throw new AppError(SaladResponseMsg.FAILED, 400);
    }
  }

  async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<Page>> {
    try {
      const queryBuilder = this.pageRepository.createQueryBuilder('page');

      queryBuilder
        .where('page.is_active = :isActive', { isActive: true })
        .leftJoinAndSelect('page.reviews', 'reviews')
        .leftJoinAndSelect('page.users', 'users');

      if (pageOptionsDTO?.skip) {
        queryBuilder.skip(pageOptionsDTO.skip);
      }
      if (pageOptionsDTO?.take) {
        queryBuilder.take(pageOptionsDTO.take);
      }

      const [items, count] = await queryBuilder.getManyAndCount();

      const pageMetaDTO = new PageMetaDTO({
        page_options_dto: pageOptionsDTO,
        total_items: count,
      });

      return new PageDTO(items, pageMetaDTO);
    } catch (error) {
      log.error('getAllPages() error', error);
      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.statusCode || 400
      );
    }
  }

  async likePage(likerId: string, pageId: string): Promise<Page> {
    try {
      const page = await this.findById(pageId);
      const alreadyLiked = await this.likeRepository.findOne({
        where: {
          pageId,
          likerId,
        },
      });

      if (alreadyLiked) {
        throw new ResourceAlreadyExistsException(
          'You have already liked this page.'
        );
      } else {
        let likes = page.likes;
        likes++;

        const like = this.likeRepository.create({ likerId, pageId });
        await this.likeRepository.save(like);
        return await this.update(pageId, { likes });
      }
    } catch (error) {
      log.error('likePage() error', error);
      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.statusCode || 400
      );
    }
  }

  async viewPageInfo(pageId: string): Promise<string> {
    try {
      const page = await this.findById(pageId);
      return page.page_info;
    } catch (error) {
      log.error('viewPageInfo() error', error);
      throw new AppError(
        error?.message || 'Error fetching page info, try again...',
        error?.statusCode || 400
      );
    }
  }

  async ratePage(raterId: string, pageId: string, rating: number) {
    try {
      if (rating > 5) {
        throw new AppError('Cannot rate a page higher than 5', 400);
      }

      const page = await this.findById(pageId);
      const { avg_rating, total_rating_amount, total_rated_times } = page;

      const userHasRatedPageOnceBefore = await this.ratingRepository.findOne({
        where: {
          pageId,
          raterId,
        },
      });

      let newRatingData: RatingDTO;

      /**
       * If user has rated page before simply update the already existing rating - thereby eliminating double-rating
       */
      if (userHasRatedPageOnceBefore) {
        newRatingData = this.getNewRatingStats(
          {
            avg_rating: userHasRatedPageOnceBefore.rating,
            total_rated_times,
            total_rating_amount,
          },
          rating,
          false
        );
      } else {
        newRatingData = this.getNewRatingStats(
          {
            avg_rating,
            total_rated_times,
            total_rating_amount,
          },
          rating
        );

        const newRating = this.ratingRepository.create({
          raterId,
          pageId,
          rating,
        });

        await this.ratingRepository.save(newRating);

        return await this.update(pageId, { ...newRatingData });
      }
    } catch (error) {
      log.error('ratePage() error', error);
      throw new AppError(
        error?.message || 'Error rating page, try again...',
        error?.statusCode || 400
      );
    }
  }

  /**
   * This is a helper method that takes the old rating stats as well as the new rating being added to the page and returns the new rating stats relative to the most recent update.
   * @param ratingData
   * @param newRating
   */
  private getNewRatingStats(
    ratingData: Partial<RatingDTO>,
    newRating: number,
    withIncrement: boolean = true
  ): RatingDTO {
    const { avg_rating, total_rated_times, total_rating_amount } = ratingData;
    let newTotalRatedTimes;
    let newTotalRatingAmount;
    let newAvgRating;
    let newRatingStats = new RatingDTO();

    /**
     * Basically, if we have a user rating a page they have rated before, we have to specify that this argument should be false at the point where we invoke getNewRatingStats()
     * This will inform the private method that it should adjust its algorithm to prevent double-rating.
     */
    if (!withIncrement) {
      (newTotalRatedTimes = total_rated_times),
        (newTotalRatingAmount = total_rating_amount - avg_rating + newRating),
        (newAvgRating = newTotalRatingAmount / total_rated_times);
    } else {
      newTotalRatedTimes = total_rated_times + 1;
      newTotalRatingAmount = total_rating_amount + newRating;
      newAvgRating = newTotalRatingAmount / newTotalRatedTimes;
      newRatingStats = {
        avg_rating: newAvgRating,
        total_rated_times: newTotalRatedTimes,
        total_rating_amount: newTotalRatingAmount,
      };
    }

    return newRatingStats;
  }
}
