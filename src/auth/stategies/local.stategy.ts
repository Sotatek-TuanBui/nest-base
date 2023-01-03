import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { User } from "src/entities/user.entity";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    validate(email: string, password: string): Promise<User>
    {
        console.log(email, password);
        return this.authService.validateUser(email, password);
    }
}