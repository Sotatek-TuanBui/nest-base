import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { LoggerService } from 'src/common/logger.service';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {

    constructor(repository: UserRepository, logger: LoggerService)
    {
        super(repository, logger);
    }

    findByEmail(email: string): Promise<User|null>
    {
        return this.repository.findOneBy({ email: email });
    }

    findById(id: number): Promise<User> {
        return this.repository.findOne({
            relations: { role: true },
            where: {
                id
            }
        });
    }
}
