import { IsBoolean, IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';
import { PasswordConfirmValidator } from 'src/validators/password-confirm.validator';
import { UniqueValidator } from 'src/validators/unique.validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @Validate(UniqueValidator, ['email'])
    email: string;

    @Validate(UniqueValidator, ['username'])
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @Length(8, 24)
    password: string;

    @IsNotEmpty()
    @Validate(PasswordConfirmValidator, ['password'])
    password_confirm: string;

    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean;
}