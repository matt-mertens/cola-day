import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload-interface';
import { UserRespository } from './user.repository';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRespository)
        private userRepositoty: UserRespository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'test'
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