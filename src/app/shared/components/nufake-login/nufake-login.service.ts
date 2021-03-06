import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../../interfaces/login/Login.interface';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NufakeLoginService {
  API_URL = environment.API_URL

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  doLogin({ usuario, senha }: Login) {
    //Chamando a API localhost:3000/login
    // return this.http.post(`${this.API_URL}/login`, { usuario, senha }, this.httpOptions)

    // MOCK
    if (usuario === 'usuario' && senha === 'senha') {
      return of({
        login: {
          usuario: "usuario",
          senha: "senha"
        },
        token:"tokendousuario"
      })
      .pipe(
        tap(
          response => {
            this.authService.setUser(response.login);
            this.authService.setToken(response.token);
          }
        )
      )
    }
    return throwError("Usuário ou senha incorretos")
  }
}
