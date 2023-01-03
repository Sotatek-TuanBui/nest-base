import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async validateUser(email: string, password: string): Promise<User>
    {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const compareResult = await bcrypt.compare(password, user.password);

        if (!compareResult) {
            throw new UnauthorizedException();
        }

        return user;
    }

    async generateJwtToken(user: User): Promise<{ accessToken: string }>
    {
        const payload = {
            email: user.email,
            sub: user.id
        }
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: this.configService.get<string>('jwtExpiresIn')
            })
        }
    }
}
