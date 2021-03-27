import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload-interface';
import { UserRespository } from './user.repository';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRespository)
        private userRepositoty: UserRespository,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'super_secret',
        });
    }

    async validate(payload: JwtPayload) {
        const { email } = payload;
        const user = await this.userRepositoty.findOne({ email })

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}