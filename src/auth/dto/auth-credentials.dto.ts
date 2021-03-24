import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    @MaxLength(30)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'password must contain 1 uppercase, 1 lowercase, and 1 special character'}
    )
    password: string;
}