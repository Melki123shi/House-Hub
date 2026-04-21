import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInAuthDto } from './dto/update-auth.dto';
import { SUPABASE_CLIENT } from './supabase.client';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    // Inject a reusable Supabase client created in a dedicated provider.
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async signUp(createAuthDto: CreateAuthDto) {
    const { email, password, fullName } = createAuthDto;

    // Create a new Supabase auth user with optional metadata.
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: fullName ? { full_name: fullName } : undefined,
      },
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return {
      message:
        'Signup request submitted. Check email if confirmation is enabled.',
      user: data.user,
      session: data.session,
    };
  }

  async signIn(signInDto: SignInAuthDto) {
    const { email, password } = signInDto;

    // Ask Supabase Auth to verify user credentials and return a session.
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
      expires_in: data.session?.expires_in,
      token_type: data.session?.token_type,
      user: data.user,
    };
  }

  async getUserFromAccessToken(accessToken: string) {
    // Validate the JWT with Supabase and fetch the matching user profile.
    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      throw new UnauthorizedException(
        'Invalid or expired Supabase access token.',
      );
    }

    // Use app_metadata for authorization data; user_metadata is user-editable.
    const role = this.normalizeRole(data.user.app_metadata?.role);
    const roles = this.normalizeRoles(data.user.app_metadata?.roles);
    return {
      ...data.user,
      role,
      roles,
    };
  }

  private normalizeRole(value: unknown): UserRole | undefined {
    if (typeof value !== 'string') {
      return undefined;
    }

    const normalized = value.toLowerCase();
    return this.isUserRole(normalized) ? normalized : undefined;
  }

  private normalizeRoles(value: unknown): UserRole[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.toLowerCase())
      .filter((item): item is UserRole => this.isUserRole(item));
  }

  private isUserRole(value: string): value is UserRole {
    return Object.values(UserRole).includes(value as UserRole);
  }
}
