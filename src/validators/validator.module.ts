import { Global, Module } from '@nestjs/common';
import { UserHttpModule } from 'src/user/user-http.module';
import { PasswordConfirmValidator } from './password-confirm.validator';
import { UniqueEmailValidator } from './unique-email.validator';
import { UniqueValidator } from './unique.validator';

@Global()
@Module({
  imports: [
    UserHttpModule,
  ],
  providers: [
    PasswordConfirmValidator,
    UniqueEmailValidator,
    UniqueValidator
  ],
  exports: [
    PasswordConfirmValidator,
    UniqueEmailValidator,
    UniqueValidator,
  ],
})
export class ValidatorModule {
}
