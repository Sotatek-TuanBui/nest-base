import { Controller, Post, Get, Request, UseGuards, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthUser } from 'src/decorators/authUser.decorator';
import { plainToClass } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('/login')
    async login(@Body() data: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.authService.validateUser(data.email, data.password);

        return this.authService.generateJwtToken(user);
    }

    @ApiBearerAuth()
    @Get('/me')
    @UseGuards(JwtAuthGuard)
    public async myProfile(@Request() req, @AuthUser() authUser): Promise<any> {
      const user = await this.userService.findById(authUser.sub)

      return {
        ...plainToClass(User, user),
        authUser,
      }
    }
}
