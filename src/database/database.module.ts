import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('databaseHost'),
                port: configService.get<number>('databasePort'),
                username: configService.get<string>('databaseUsername'),
                password: configService.get<string>('databasePassword'),
                database: configService.get<string>('databaseName'),
                entities: [User, Role],
                logging: ['error', 'query']
            }),
            inject: [ConfigService]
        }),
    ]
})
export class DatabaseModule {}
