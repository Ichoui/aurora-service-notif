import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, tap } from 'rxjs';

const headers = { Aurora: 'true' };
@Injectable()
export class AppService {
  // https://docs.nestjs.com/techniques/task-scheduling
  constructor(private readonly _http: HttpService) {}
  // @Cron('* * * * * *', { name: 'increasingKp' })
  increasingKp(): void {
    this._pushNotification({ title: 'KP', description: 'Increase' + new Date() });
  }

  private _pushNotification(body: { title: string; description: string }): void {
    this._http
      .post(`${process.env.HOST}${process.env.NOTIFICATION_URL}`, { params: { body } }, { headers })
      .pipe(
        tap(e => console.log(e.data)),
        catchError(async err => console.log(err)),
      )
      .subscribe();
  }
}
