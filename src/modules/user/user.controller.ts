import { HttpStatus } from '../../enums/http-status.enum';
import { SaladResponseMsg } from '../../enums/salad-response.enum';
import { ResponseModel } from '../../models/response.model';
import UserService from './user.service';

export default class UserController {
  constructor(private userService: UserService) {}
  async updateUser(request: any) {
    try {
      const { userId } = request.params;
      const data = request.body;

      const serviceResponse = await this.userService.update(userId, data);

      return new ResponseModel(
        HttpStatus.OK,
        'User successfully updated.',
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

  async deleteUser(request: any) {
    try {
      const { userId } = request.params;

      const serviceResponse = await this.userService.delete(userId);

      return new ResponseModel(HttpStatus.OK, 'User successfully deleted.', {
        userId,
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

  async getUser(request: any) {
    try {
      const { userId } = request.params;

      const user = await this.userService.getUserById(userId);

      return new ResponseModel(HttpStatus.OK, SaladResponseMsg.SUCCESS, user);
    } catch (error) {
      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || SaladResponseMsg.FAILED,
        null
      );
    }
  }

  async getAllUsers(request: any) {
    try {
      const queryOptions = request.query;

      const serviceResponse = await this.userService.getAll(queryOptions);

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
