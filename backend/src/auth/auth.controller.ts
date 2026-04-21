import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInAuthDto } from './dto/update-auth.dto';
import { CurrentUser } from './current-user.decorator';
import { Public } from './public.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @Public()
  signUp(@Body() createAuthDto: CreateAuthDto) {
    // Public endpoint to register a new user in Supabase Auth.
    return this.authService.signUp(createAuthDto);
  }

  @Post('signin')
  @Public()
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    // Public endpoint to exchange email/password for Supabase tokens.
    return this.authService.signIn(signInAuthDto);
  }

  @Get('me')
  me(@CurrentUser() user: unknown) {
    // Protected endpoint that returns the currently authenticated user.
    return user;
  }
}
