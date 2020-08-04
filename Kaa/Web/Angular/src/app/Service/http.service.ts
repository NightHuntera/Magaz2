import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin':'*',
  });
  private httpOptions = ({ headers: this.headers, withCredentials: true });
 api = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {

 }
  get(link){

    return this.http.get(this.api+link,this.httpOptions).pipe(response => response);
  }
  post(link, body){
    return this.http.post(this.api + link, body, this.httpOptions).pipe(response => response);
  }

  makeFileRequest(url: string, files: Array<File>) {
    return new Promise((resolve, reject) => {
        const formData: any = new FormData();
        let xhr = new XMLHttpRequest();
        formData.append('file', files[0]);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        };

        xhr.open('POST', this.api + url, true);
        xhr.withCredentials = true;
        xhr.send(formData);
    });
}
}
