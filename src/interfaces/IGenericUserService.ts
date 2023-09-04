import { PageOptionsDTO } from '../paging/page-option.dto';
import { PageDTO } from '../paging/page.dto';




/**
 * This interface is meant to serve as sort of a standard template for all our service code - converging the description of requirements for a **typical** service within our scope of work.
 * All services within the application can extend it for further customization. This enforces some uniformity amongst our services and makes the code easier both to read and write.
 * The interface takes a generic type which is generally the type of the entity that owns the service implementation.
 */
export interface IGenericAppService<T> {
  create(data: T, id?: string): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  findById(id: string, withException?: boolean): Promise<T>;
  getAll(queryOptions: PageOptionsDTO, userId?: string): Promise<PageDTO<T>>;
}
