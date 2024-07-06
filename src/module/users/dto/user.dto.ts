import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDTO {
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @Length(8, 20, {
        message: 'Password length must be between 8 and 20 characters.',
    })
    password: string;

    @IsNotEmpty()
    @IsEnum(['admin', 'user'], {
        message: 'Role must be either admin or user.',
    })
    role: string;
}

export class UserParamsDTO {
    @IsOptional()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit?: number = 10;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    offset?: number = 0;
}

export class ExistingUserDTO {
    email: string;
    password: string;
}
