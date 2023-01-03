import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() userData: CreateUserDto): Promise<User>
    {
        const createdUser = await this.userService.store(userData);

        return plainToClass(User, createdUser);
    }

    @Get()
    async getAll(): Promise<User[]>
    {
        return await this.userService.findAll();
    }
}