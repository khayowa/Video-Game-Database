import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  subscribe(arg0: (gameResp: Game) => void): import("rxjs").Subscription {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }


  getGameList(
    ordering: string,
    search?: string
  ):Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering', ordering);

    if(search){
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{params: params,});

  }

  getGameDetails(id: string):Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(map((resp: any) => {
      return {
        ...resp['gameInfoRequest'],
        screenshots: resp['gameScreenShotsRequest']?.results,
        trailers: resp['gameTrailersRequest']?.results,
      };
    }));
  }
}
