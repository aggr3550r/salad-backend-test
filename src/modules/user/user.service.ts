import { FindOneOptions, Repository, getRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import logger from '../../utils/logger.util';
import { AppError } from '../../exceptions/AppError';

import { PageOptionsDTO } from '../../paging/page-option.dto';
import { PageMetaDTO } from '../../paging/page-meta.dto';
import { PageDTO } from '../../paging/page.dto';
import { UserAlreadyExistsException } from '../../exceptions/UserAlreadyExistsException';
import { ResourceNotFoundException } from '../../exceptions/ResourceNotFound';
import { SaladResponseMsg } from '../../enums/salad-response.enum';
import { IGenericAppService } from '../../interfaces/IGenericUserService';

const log = logger.getLogger();

export default class UserService implements IGenericAppService<User> {
  constructor(private userRepository: Repository<User>) {
    this.userRepository = getRepository<User>(User);
  }

  async create(data: CreateUserDTO): Promise<User> {
    try {
      const options: FindOneOptions<User> = {
        where: {
          name: data.name,
          email: data.email,
          is_active: true,
        },
      };
      const userAlreadyExists = await this.userRepository.findOne(options);

      if (userAlreadyExists)
        throw new UserAlreadyExistsException(
          'Username or Email already taken. Choose another.'
        );

      const newUser = this.userRepository.create(data);
      return await this.userRepository.save(newUser);
    } catch (error) {
      log.error('createUser() error', error);

      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.statusCode || 400
      );
    }
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    try {
      const user = await this.findById(id);
      Object.assign(user, data);
      return await this.userRepository.save(user);
    } catch (error) {
      log.error('updateUser() error', error);
      throw new AppError(SaladResponseMsg.FAILED, 400);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const options: FindOneOptions<User> = {
        where: {
          id,
          is_active: true,
        },
      };

      return await this.userRepository.findOne(options);
    } catch (error) {
      log.error('findUserById() error', error);
      throw new AppError('Unable to find user with that id', 400);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const options: FindOneOptions<User> = {
        where: {
          email,
          is_active: true,
        },
      };
      return await this.userRepository.findOne(options);
    } catch (error) {
      log.error('findUserByEmail() error', error);
      throw new AppError('Unable to find user with that email', 400);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const user = await this.findById(id);
      if (!user) {
        return false;
      }

      const update: Partial<UpdateUserDTO> = {
        is_active: false,
      };

      Object.assign(user, update);

      await this.userRepository.save(user);
      return true;
    } catch (error) {
      log.error('deleteUser() error', error);
      throw new AppError(SaladResponseMsg.FAILED, 400);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.findById(id);

      if (!user)
        throw new ResourceNotFoundException("Couldn't find user with that id");

      return user;
    } catch (error) {
      log.error('getUser() error', error);
      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.statusCode || 400
      );
    }
  }

  async getAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<User>> {
    try {
      let [items, count] = await this.userRepository.findAndCount({
        where: {
          is_active: true,
        },
        skip: pageOptionsDTO?.skip,
        take: pageOptionsDTO?.take,
      });

      const pageMetaDTO = new PageMetaDTO({
        page_options_dto: pageOptionsDTO,
        total_items: count,
      });

      return new PageDTO(items, pageMetaDTO);
    } catch (error) {
      log.error('getAllUsers() error', error);
      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.statusCode || 400
      );
    }
  }
}
