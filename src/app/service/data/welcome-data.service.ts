import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorldBeanService() {
	  return this.http.get<HelloWorldBean>('http://localhost:8080/test/helloworld');
  }

  //http://localhost:8080/test/helloworld/path-variable/fofana
  executeHelloWorldBeanServicePathVariable(name) {
  
    return this.http.get<HelloWorldBean>(`http://localhost:8080/test/helloworld/path-variable/${name}`, 

    );
  }

}
