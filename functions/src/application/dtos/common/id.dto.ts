import { IsString, IsNotEmpty } from "class-validator";

export class IdDto {
  @IsString()
  @IsNotEmpty()
    id!: string;
}
