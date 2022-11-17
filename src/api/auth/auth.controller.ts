import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from 'src/config/constants';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req) {
    const sessionId = req.headers.session_id || null;

    return await this._authService.login(req.user, sessionId);
  }
}
