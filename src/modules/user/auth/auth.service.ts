import { Response } from 'express';
import logger from '../../../utils/logger.util';
import { User } from '../entities/user.entity';
import SecurityUtil from '../../../utils/security.util';
import { HttpStatus } from '../../../enums/http-status.enum';
import { AppError } from '../../../exceptions/AppError';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { LoginDTO } from '../dtos/login-dto';
import { ResourceNotFoundException } from '../../../exceptions/ResourceNotFound';
import UserService from '../user.service';

const log = logger.getLogger();

export default class AuthService {
  constructor(private userService: UserService) {}

  /**
   * This method creates a JWT token to be sent to the client which it will use to make subsequent requests to protected routes.
   * It essentially simulates logging a user into the app.
   * @param user
   * @param statusCode
   * @param res
   */
  async createAndSendAuthToken(user: User, statusCode: number, res: Response) {
    try {
      const token = await SecurityUtil.generateTokenWithSecret(user);

      const cookieOptions: any = {
        expires: new Date(
          Date.now() +
            (Number(process.env.JWT_COOKIE_EXPIRES_IN) ?? 24) *
              24 *
              60 *
              60 *
              1000
        ),
        httpOnly: true,
      };
      if (process.env.NODE_ENV === 'production' || 'prod' || 'prd')
        cookieOptions['secure'] = true;

      res.cookie('jwt', token, cookieOptions);

      // Remove password from output
      user.password = undefined;

      res.status(statusCode).json({
        statusCode: HttpStatus.OK,
        message: 'Successfully logged in.',
        data: {
          token,
          user,
        },
      });
    } catch (error) {
      log.error('createAndSendAuthToken() error', error);
      throw new AppError(
        error?.message || 'Could not complete user signin.',
        error?.status || 400
      );
    }
  }

  async signup(data: CreateUserDTO) {
    try {
      let { password } = data;

      const encryptedPassword = await SecurityUtil.encryptPassword(password);
      Object.assign(data, { password: encryptedPassword });

      return await this.userService.create(data);
    } catch (error) {
      log.error('signup() error', error);
      throw new AppError(
        error?.message || 'Could not complete user signup.',
        error?.statusCode || 400
      );
    }
  }

  async login(data: LoginDTO) {
    try {
      const user = await this.userService.findByEmail(data.email);

      if (!user) {
        throw new ResourceNotFoundException(
          'Could not find user with that email.'
        );
      }

      const verificationResult = await SecurityUtil.decryptAndVerifyPassword(
        data.password,
        user
      );

      return verificationResult;
    } catch (error) {
      log.error('login() error', error);
      throw new AppError(
        error?.message || 'Could not complete user login.',
        error?.statusCode || 400
      );
    }
    ``;
  }
}
