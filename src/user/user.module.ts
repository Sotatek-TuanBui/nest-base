import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule]
})
export class UserModule {}
