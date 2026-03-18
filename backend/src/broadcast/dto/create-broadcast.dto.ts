import { IsString, MinLength } from 'class-validator';

export class CreateBroadcastDto {
  @IsString()
  @MinLength(1)
  message: string;
}
