import { PageOptionsDTO } from '../paging/page-option.dto';
import { PageDTO } from '../paging/page.dto';

/**
 * This interface is meant to serve as sort of a standard template for all our service code - converging the description of requirements for a service within our scope of work.
 * All services within the application can extend it for further customization. This enforces some uniformity amongst our services and makes the code easier both to read and write.
 */
export interface IGenericAppService<T> {
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<T>;
  findByEmail(email: string): Promise<T>;
  getAll(queryOptions: PageOptionsDTO): Promise<PageDTO<T>>;
}
