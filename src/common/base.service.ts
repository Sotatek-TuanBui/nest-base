import { BaseEntity, DeleteResult, Repository } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";
import { _baseService } from "./base.interface";
import { LoggerService } from "./logger.service";

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements _baseService<T> {
    protected readonly repository: R;
    protected readonly logger: LoggerService;

    constructor(repository: R, logger: LoggerService) {
        this.repository = repository
        this.logger = logger
    }

    index(): Promise<T[]> {
        return this.repository.find()
    }

    findById(id: EntityId): Promise<T> {
        return this.repository.findOneById(id)
    }

    findByIds(ids: [EntityId]): Promise<T[]> {
        return this.repository.findByIds(ids)
    }

    findBy(param: Record<string, any>): Promise<T|null>
    {
        return this.repository.findOneBy(param)
    }

    findAll(): Promise<T[]> {
        return this.repository.find();
    }

    store(data: any): Promise<T> {
        return this.repository.save(data)
    }

    async update(id: EntityId, data: any): Promise<T> {
        await this.repository.update(id, data)
        return this.findById(id)
    }

    delete(id: EntityId): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}