import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){

    }
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
         .catch((error, caught) =>{

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }            
            if (!errorObj.status){
                errorObj = JSON.parse(errorObj)
            }
            console.log("Error detectado pelo Interceptor");
            console.log(errorObj);

            switch(errorObj.status){
                case 403: this.handle403();
                break;
            }

            return Observable.throw(errorObj)
         }) as any;
    }

    handle403(){
      this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}