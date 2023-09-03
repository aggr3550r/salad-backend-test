import { HttpStatus } from '../../enums/http-status.enum';
import { SaladResponseMsg } from '../../enums/salad-response.enum';
import { ResponseModel } from '../../models/response.model';
import logger from '../../utils/logger.util';
import { PageService } from './page.service';

const log = logger.getLogger();
export class PageController {
  constructor(private pageService: PageService) {}

  async createPage(request: any) {
    try {
      const data = request.body;
      const serviceResponse = await this.pageService.create(data);
      return new ResponseModel(
        HttpStatus.CREATED,
        'Page successfully created',
        serviceResponse
      );
    } catch (error) {
      log.error('createPage() error', error);
      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async updatePage(request: any) {
    try {
      const { pageId } = request.params;
      const data = request.body;

      const serviceResponse = await this.pageService.update(pageId, data);

      return new ResponseModel(
        HttpStatus.OK,
        'Page successfully updated.',
        serviceResponse
      );
    } catch (error) {
      log.error('updatePage() error', error);

      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async deletePage(request: any) {
    try {
      const { pageId } = request.params;
      const serviceResponse = await this.pageService.delete(pageId);

      return new ResponseModel(
        HttpStatus.OK,
        SaladResponseMsg.SUCCESS,
        serviceResponse
      );
    } catch (error) {
      log.error('deletePage() error', error);

      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async getAllPages(request: any) {
    try {
      const queryOptions = request.query;
      const serviceResponse = await this.pageService.getAll(queryOptions);

      return new ResponseModel(
        HttpStatus.OK,
        SaladResponseMsg.SUCCESS,
        serviceResponse
      );
    } catch (error) {
      log.error('getAllPages() error', error);

      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async viewPageInfo(request: any) {
    try {
      const { pageId } = request.params;
      const serviceResponse = await this.pageService.viewPageInfo(pageId);

      return new ResponseModel(
        HttpStatus.OK,
        SaladResponseMsg.SUCCESS,
        serviceResponse
      );
    } catch (error) {
      log.error('viewPageInfo() error', error);

      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async ratePage(request: any) {
    try {
      const { pageId } = request.params;
      const data = request.body;

      const serviceResponse = await this.pageService.ratePage(pageId, data);

      return new ResponseModel(
        HttpStatus.OK,
        SaladResponseMsg.SUCCESS,
        serviceResponse
      );
    } catch (error) {
      log.error('ratePage() error', error);

      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async likePage(request: any) {
    try {
      const { pageId } = request.params;
      const serviceResponse = await this.pageService.likePage(pageId);

      return new ResponseModel(
        HttpStatus.OK,
        SaladResponseMsg.SUCCESS,
        serviceResponse
      );
    } catch (error) {
      log.error('likePage() error', error);

      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }
}
