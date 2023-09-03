import { PageOptionsDTO } from '../paging/page-option.dto';
import { PageDTO } from '../paging/page.dto';




/**
 * This interface is meant to serve as sort of a standard template for all our service code - converging the description of requirements for a **typical** service within our scope of work.
 * All services within the application can extend it for further customization. This enforces some uniformity amongst our services and makes the code easier both to read and write.
 */
export interface IGenericAppService<T> {
  create(data: T, id?: string): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<T>;
  getAll(queryOptions: PageOptionsDTO, userId?: string): Promise<PageDTO<T>>;
}
