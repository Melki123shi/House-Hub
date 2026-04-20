import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SUPABASE_CLIENT } from './supabase.client';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockSupabaseClient = {
      auth: {
        signUp: jest.fn(),
        signInWithPassword: jest.fn(),
        getUser: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: SUPABASE_CLIENT, useValue: mockSupabaseClient },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
