import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import AppConfig from './config/app.config';
import AuthConfig from './config/auth.config';
import DatabaseConfig from './config/database.config';
import { LoggerModule } from './common/logger.module';
import { UserHttpModule } from './user/user-http.module';
import { ValidatorModule } from './validators/validator.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [
        AppConfig,
        AuthConfig,
        DatabaseConfig
      ]
    }),
    DatabaseModule,
    UserHttpModule,
    AuthModule,
    LoggerModule,
    ValidatorModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
