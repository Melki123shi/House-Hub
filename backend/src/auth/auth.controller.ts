import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInAuthDto } from './dto/update-auth.dto';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { CurrentUser } from './current-user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    // Public endpoint to register a new user in Supabase Auth.
    return this.authService.signUp(createAuthDto);
  }

  @Post('signin')
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    // Public endpoint to exchange email/password for Supabase tokens.
    return this.authService.signIn(signInAuthDto);
  }

  @Get('me')
  @UseGuards(SupabaseAuthGuard)
  me(@CurrentUser() user: unknown) {
    // Protected endpoint that returns the currently authenticated user.
    return user;
  }
}
