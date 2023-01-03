import { HttpStatus } from "@nestjs/common";
import { ValidationOptions } from "class-validator";

export const ValidationConfig: ValidationOptions | Record<string, any> = {
    whitelist: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
    skipMissingProperties: false,
} 