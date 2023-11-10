import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiResponse } from '../types/users-response';
import { environments } from 'src/environment/environment';
import { UserCreate } from '../types/createUser-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllusers(): Observable<UserApiResponse>{
    const url = `${environments.apiUrl}/users`;
    return this.http.get<UserApiResponse>(url)
  };

  addNewUser(user:FormData): Observable<UserCreate>{
    const url = `${environments.apiUrl}/users`;
    return this.http.post<UserCreate>(url, user);
  };

  getOneUser(id:string): Observable<UserCreate>{
    const url = `${environments.apiUrl}/users/${id}`;
    return this.http.get<UserCreate>(url);
  };

  updateUser(user:FormData , id:string): Observable<UserCreate>{
    const url = `${environments.apiUrl}/users/${id}`;
    return this.http.patch<UserCreate>(url,user);
  };

  deleteUser(id: string) {
    const url = `${environments.apiUrl}/users/${id}`;
    return this.http.delete(url);
  }

}
