// import { Test, TestingModule } from '@nestjs/testing';
// import { t_user } from '@prisma/client';
// import { decode } from 'jsonwebtoken';
// import { AppModule } from 'src/app.module';
// import { PrismaService } from 'src/common/prisma/prisma.service';
// import { Tokens } from './types';
// import { AuthService } from './auth.service';

// const user = {
//   email: 'test@gmail.com',
//   password: 'super-secret-password',
// };

// describe('Auth Flow', () => {
//   let prisma: PrismaService;
//   let authService: AuthService;
//   let moduleRef: TestingModule;

//   beforeAll(async () => {
//     moduleRef = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     prisma = moduleRef.get(PrismaService);
//     authService = moduleRef.get(AuthService);
//   });

//   afterAll(async () => {
//     await moduleRef.close();
//   });

//   describe('signup', () => {
//     beforeAll(async () => {
//       await prisma.cleanDatabase();
//     });

//     it('should signup', async () => {
//       const tokens = await authService.signupLocal({
//         email: user.email,
//         password: user.password,
//       });

//       expect(tokens.access_token).toBeTruthy();
//       expect(tokens.refresh_token).toBeTruthy();
//     });

//     it('should throw on duplicate user signup', async () => {
//       let tokens: Tokens | undefined;
//       try {
//         tokens = await authService.signupLocal({
//           email: user.email,
//           password: user.password,
//         });
//       } catch (error) {
//         expect(error.status).toBe(403);
//       }

//       expect(tokens).toBeUndefined();
//     });
//   });

//   describe('signin', () => {
//     beforeAll(async () => {
//       await prisma.cleanDatabase();
//     });
//     it('should throw if no existing user', async () => {
//       let tokens: Tokens | undefined;
//       try {
//         tokens = await authService.signinLocal({
//           email: user.email,
//           password: user.password,
//         });
//       } catch (error) {
//         expect(error.status).toBe(403);
//       }

//       expect(tokens).toBeUndefined();
//     });

//     it('should login', async () => {
//       await authService.signupLocal({
//         email: user.email,
//         password: user.password,
//       });

//       const tokens = await authService.signinLocal({
//         email: user.email,
//         password: user.password,
//       });

//       expect(tokens.access_token).toBeTruthy();
//       expect(tokens.refresh_token).toBeTruthy();
//     });

//     it('should throw if password incorrect', async () => {
//       let tokens: Tokens | undefined;
//       try {
//         tokens = await authService.signinLocal({
//           email: user.email,
//           password: user.password + 'a',
//         });
//       } catch (error) {
//         expect(error.status).toBe(403);
//       }

//       expect(tokens).toBeUndefined();
//     });
//   });

//   describe('logout', () => {
//     beforeAll(async () => {
//       await prisma.cleanDatabase();
//     });

//     it('should pass if call to non existent user', async () => {
//       const result = await authService.logout(4);
//       expect(result).toBeDefined();
//     });

//     it('should logout', async () => {
//       await authService.signupLocal({
//         email: user.email,
//         password: user.password,
//       });

//       let userFromDb: t_user | null;

//       userFromDb = await prisma.t_user.findFirst({
//         where: {
//           email: user.email,
//         },
//       });
//       expect(userFromDb?.hashed_rt).toBeTruthy();

//       // logout
//       await authService.logout(userFromDb!.id);

//       userFromDb = await prisma.t_user.findFirst({
//         where: {
//           email: user.email,
//         },
//       });

//       expect(userFromDb?.hashed_rt).toBeFalsy();
//     });
//   });

//   describe('refresh', () => {
//     beforeAll(async () => {
//       await prisma.cleanDatabase();
//     });

//     it('should throw if no existing user', async () => {
//       let tokens: Tokens | undefined;
//       try {
//         tokens = await authService.refreshTokens(1, '');
//       } catch (error) {
//         expect(error.status).toBe(403);
//       }

//       expect(tokens).toBeUndefined();
//     });

//     it('should throw if user logged out', async () => {
//       // signup and save refresh token
//       const _tokens = await authService.signupLocal({
//         email: user.email,
//         password: user.password,
//       });

//       const rt = _tokens.refresh_token;

//       // get user id from refresh token
//       // also possible to get using prisma like above
//       // but since we have the rt already, why not just decoding it
//       const decoded = decode(rt);
//       const userId = String(decoded?.sub);

//       // logout the user so the hashed_rt is set to null
//       await authService.logout(userId);

//       let tokens: Tokens | undefined;
//       try {
//         tokens = await authService.refreshTokens(userId, rt);
//       } catch (error) {
//         expect(error.status).toBe(403);
//       }

//       expect(tokens).toBeUndefined();
//     });

//     // it('should throw if refresh token incorrect', async () => {
//     //   await prisma.cleanDatabase();

//     //   const _tokens = await authService.signupLocal({
//     //     email: user.email,
//     //     password: user.password,
//     //   });
//     //   console.log({
//     //     _tokens,
//     //   });

//     //   const rt = _tokens.refresh_token;

//     //   const decoded = decode(rt);
//     //   const userId = String(decoded?.sub);

//     //   let tokens: Tokens | undefined;
//     //   try {
//     //     tokens = await authService.refreshTokens(userId, rt + 'a');
//     //   } catch (error) {
//     //     expect(error.status).toBe(403);
//     //   }

//     //   expect(tokens).toBeUndefined();
//     // });

//     it('should refresh tokens', async () => {
//       await prisma.cleanDatabase();
//       // log in the user again and save rt + at
//       const _tokens = await authService.signupLocal({
//         email: user.email,
//         password: user.password,
//       });

//       const rt = _tokens.refresh_token;
//       const at = _tokens.access_token;

//       const decoded = decode(rt);
//       const userId = String(decoded?.sub);

//       // since jwt uses seconds signature we need to wait for 1 second to have new jwts
//       await new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve(true);
//         }, 1000);
//       });

//       const tokens = await authService.refreshTokens(userId, rt);
//       expect(tokens).toBeDefined();

//       // refreshed tokens should be different
//       expect(tokens.access_token).not.toBe(at);
//       expect(tokens.refresh_token).not.toBe(rt);
//     });
//   });
// });
