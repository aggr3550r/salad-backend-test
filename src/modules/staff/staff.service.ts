import { FindOneOptions, Repository, getRepository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { IGenericAppService } from '../../interfaces/IGenericUserService';
import { CreateStaffDTO } from './dtos/create-staff.dto';
import logger from '../../utils/logger.util';
import { AppError } from '../../exceptions/AppError';
import { SaladResponseMsg } from '../../enums/salad-response.enum';
import { UserAlreadyExistsException } from '../../exceptions/UserAlreadyExistsException';
import { UpdateStaffDTO } from './dtos/update-staff.dto';
import { PageOptionsDTO } from '../../paging/page-option.dto';
import { PageDTO } from '../../paging/page.dto';
import { PageMetaDTO } from '../../paging/page-meta.dto';

const log = logger.getLogger();

export class StaffService implements IGenericAppService<Staff> {
  constructor(private staffRepository: Repository<Staff>) {
    this.staffRepository = getRepository<Staff>(Staff);
  }

  async create(data: CreateStaffDTO): Promise<Staff> {
    try {
      const options: FindOneOptions<Staff> = {
        where: {
          email: data.email,
          is_active: true,
        },
      };

      const staffAlreadyExists = await this.staffRepository.findOne(options);

      if (staffAlreadyExists) {
        throw new UserAlreadyExistsException(
          'A staff already exists with that email.'
        );
      }

      const newStaff = this.staffRepository.create(data);
      return await this.staffRepository.save(newStaff);
    } catch (error) {
      log.error('createStaff() error', error);

      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.statusCode || 400
      );
    }
  }

  async update(id: string, data: UpdateStaffDTO): Promise<Staff> {
    try {
      const user = await this.findById(id);
      Object.assign(user, data);
      return await this.staffRepository.save(user);
    } catch (error) {
      log.error('updateStaff() error', error);
      throw new AppError(SaladResponseMsg.FAILED, 400);
    }
  }

  async findById(id: string): Promise<Staff> {
    try {
      const options: FindOneOptions<Staff> = {
        where: {
          id,
          is_active: true,
        },
      };

      return await this.staffRepository.findOne(options);
    } catch (error) {
      log.error('findStaffById() error', error);
      throw new AppError('Unable to find staff with that id', 400);
    }
  }

  async findByEmail(email: string): Promise<Staff> {
    try {
      const options: FindOneOptions<Staff> = {
        where: {
          email,
          is_active: true,
        },
      };
      return await this.staffRepository.findOne(options);
    } catch (error) {
      log.error('findStaffByEmail() error', error);
      throw new AppError('Unable to find user with that email', 400);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const user = await this.findById(id);
      if (!user) {
        return false;
      }

      const update: Partial<UpdateStaffDTO> = {
        is_active: false,
      };

      Object.assign(user, update);

      await this.staffRepository.save(user);
      return true;
    } catch (error) {
      log.error('deleteStaff() error', error);
      throw new AppError(SaladResponseMsg.FAILED, 400);
    }
  }

  async getAll(queryOptions: PageOptionsDTO): Promise<PageDTO<Staff>> {
    try {
      let [items, count] = await this.staffRepository.findAndCount({
        where: {
          is_active: true,
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
      log.error('getAllStaff() error', error);
      throw new AppError(
        error?.message || SaladResponseMsg.FAILED,
        error?.statusCode || 400
      );
    }
  }
}
