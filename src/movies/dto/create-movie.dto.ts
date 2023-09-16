import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  // @IsOptional() 활용한 옵셔널 가능
  @IsString({ each: true })
  readonly genres: string[];
}
