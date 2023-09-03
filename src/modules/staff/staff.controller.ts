import { HttpStatus } from '../../enums/http-status.enum';
import { SaladResponseMsg } from '../../enums/salad-response.enum';
import { ResponseModel } from '../../models/response.model';
import logger from '../../utils/logger.util';
import { StaffService } from './staff.service';

const log = logger.getLogger();
export class StaffController {
  constructor(private staffService: StaffService) {}

  async createStaff(request: any) {
    try {
      const data = request.body;
      const serviceResponse = await this.staffService.create(data);

      return new ResponseModel(
        HttpStatus.CREATED,
        'Staff successfully created.',
        serviceResponse
      );
    } catch (error) {
      log.error('createStaff() error', error);
      throw new ResponseModel(
        error?.statusCode || 400,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async updateStaff(request: any) {
    try {
      const { staffId } = request.params;
      const data = request.body;

      const serviceResponse = await this.staffService.update(staffId, data);

      return new ResponseModel(
        HttpStatus.OK,
        'Staff successfully updated.',
        serviceResponse
      );
    } catch (error) {
      log.error('updateStaff() error', error);
      throw new ResponseModel(
        error?.statusCode || 400,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async getAllStaff(request: any) {
    try {
      const queryOptions = request.query;
      const serviceResponse = await this.staffService.getAll(queryOptions);

      return new ResponseModel(
        HttpStatus.OK,
        SaladResponseMsg.SUCCESS,
        serviceResponse
      );
    } catch (error) {
      log.error('getAllStaff() error', error);
      throw new ResponseModel(
        error?.statusCode || 400,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }
}
