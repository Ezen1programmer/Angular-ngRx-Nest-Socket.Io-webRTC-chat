import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { SingUpRequestInterface } from '../interfaces/sing-up-request.interface';
import { CandidateInterface } from '../interfaces/candidate.interface';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    @Inject('BASE-URL') private readonly baseUrl: string,
    @Inject('JWT_HELPER') private readonly jwtHelper: JwtHelperService,
    private readonly storageService: StorageService,
  ) {
  }

  public isAuthenticated(): boolean {
    const token = this.storageService.get('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public SingUp(candidate): Observable<SingUpRequestInterface> {
    return this.http.post<SingUpRequestInterface>(`${this.baseUrl}/auth/sing-up`, { ...candidate }).pipe(
      tap((v) => {
        console.log('AuthService', v);
      }),
    );
  }

  public sendSms(phone: string): Observable<{ smsEndowed: true }> {
    return this.http.post<{ smsEndowed: true }>(`${this.baseUrl}/auth/send-sms`, { phone });
  }

  public CheckCode(code: number, phone: string): Observable<{ confirmed: boolean }> {
    return this.http.post<{ confirmed: boolean }>(`${this.baseUrl}/auth/check-code`, { code, phone });
  }

  public sendSmsToUserPhone(phone: string): Observable<{ smsEndowed: boolean }> {
    return this.http.post<{ smsEndowed: boolean }>(`${this.baseUrl}/auth/send-sms-to-user`, { phone });
  }

  public checkUserCode(code: number, phone: string) {
    return this.http.post<{ jwt: string; user: CandidateInterface; }>(`${this.baseUrl}/auth/check-user-code`, {
      code,
      phone,
    });
  }
}
