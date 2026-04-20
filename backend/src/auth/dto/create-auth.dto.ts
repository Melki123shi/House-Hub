import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and and one special character (@$!%*?&).',
    },
  )
  password: string;

  @IsOptional()
  @IsString({ message: 'Full name must be a string.' })
  fullName?: string;
}
