import { HttpStatus } from '../../../enums/http-status.enum';
import { SaladResponseMsg } from '../../../enums/salad-response.enum';
import { ResponseModel } from '../../../models/response.model';

import AuthService from './auth.service';

export default class AuthController {
  constructor(private authService: AuthService) {}

  async login(request: any, response: any) {
    try {
      const { email, password } = request.body;
      const serviceResponse = await this.authService.login({ email, password });

      if (serviceResponse) {
        await this.authService.createAndSendAuthToken(
          serviceResponse,
          200,
          response
        );
      }
    } catch (error) {
      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || 'Error occurred while logging user in.',
        null
      );
    }
  }

  async signup(request: any) {
    try {
      const { email, password, name, age, gender } = request.body;
      const serviceResponse = await this.authService.signup({
        email,
        password,
        name,
        age,
        gender,
      });

      return new ResponseModel(
        HttpStatus.CREATED,
        SaladResponseMsg.SUCCESS,
        serviceResponse
      );

    } catch (error) {
      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || 'Error occurred while signing user up.',
        null
      );
    }
  }
}
