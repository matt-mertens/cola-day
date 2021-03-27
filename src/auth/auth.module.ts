import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRespository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: `super_secret`, //`${process.env.JWT_PRIVATE_KEY}`
      signOptions: {
        expiresIn: 3600,
        audience: 'coladay-frontend',
        issuer: 'coladay-auth',
        algorithm: 'HS256',
      }
    }),
    TypeOrmModule.forFeature([UserRespository])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [ 
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
