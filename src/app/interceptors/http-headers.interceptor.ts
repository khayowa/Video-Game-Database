import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        req = req.clone({
            setHeaders: {
                'x-rapidapi-key': '291b0e2d32mshf79032fdbce22d3p1ba8cbjsn8e3f83a45d5d',
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
            },
            setParams: {
                key: 'dd38c55249b6435e96d945960253e52b',
            }
        })
        return next.handle(req);
    }
}