import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from '@nestjs/common';
import { UserService } from "src/user/user.service";

@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.value} is taken, please try another`
    }

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        if (value && validationArguments.constraints && validationArguments.constraints[0]) {
            const param = { [validationArguments.constraints[0]]: value }
            const result = await this.userService.findBy(param);

            return !result;
        }

        return false;
        
    }
}