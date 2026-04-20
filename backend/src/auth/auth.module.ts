import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { supabaseClientProvider } from './supabase.client';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, SupabaseAuthGuard, supabaseClientProvider],
  exports: [AuthService, SupabaseAuthGuard],
})
export class AuthModule { }
