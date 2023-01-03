import { ConfigService } from "@nestjs/config";
import { User } from "src/entities/user.entity";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    private readonly bcryptSalt: number;

    constructor(connection: Connection, private readonly configService: ConfigService) {
        connection.subscribers.push(this);
        this.bcryptSalt = configService.get<number>('bcryptSalt')
    }

    listenTo(): string | Function {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>): Promise<void> {
        const { password } = event.entity;
        event.entity.password = await bcrypt.hash(password, this.bcryptSalt);
    }
}