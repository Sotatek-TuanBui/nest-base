import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

}
