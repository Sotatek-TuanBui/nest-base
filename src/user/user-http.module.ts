import { Module } from '@nestjs/common'
import { UserModule } from './user.module'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { UserRepository } from 'src/repositories/user.repository'
import { UserSubscriber } from 'src/subscribers/user.subscriber'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  providers: [UserService, UserRepository, UserSubscriber],
  exports: [UserService],
  controllers: [UserController],
})
export class UserHttpModule {
}
