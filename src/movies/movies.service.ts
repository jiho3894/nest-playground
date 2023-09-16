import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movies = this.movies.find((movie) => movie.id === id);
    if (!movies) {
      throw new NotFoundException(`${id}의 정보는 없습니다`);
    }
    return movies;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return `생성 완료`;
  }

  remove(id: number): boolean {
    const findMovies = this.movies.find((movie) => movie.id === id);
    if (!findMovies) {
      throw new NotFoundException(`${id}의 정보 없어 삭제할 수 없습니다.`);
    }
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.remove(id); // 기존 데이터 삭제
    this.movies.push({ ...movie, ...updateData });
  }
}
