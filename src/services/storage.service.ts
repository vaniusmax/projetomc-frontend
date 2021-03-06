import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Carts } from "../models/carts";

@Injectable()
export class StorageService{

    getLocalUser() : LocalUser{
      let usr = localStorage.getItem(STORAGE_KEYS.localUser);

      if(usr == null){
          return null;
      }else{
          return JSON.parse(usr);
      }
    }

    setLocalUser(obj: LocalUser){
       if(obj == null){
           localStorage.removeItem(STORAGE_KEYS.localUser);
       } else {
           localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
       }
    }

    getCart() : Carts{
        let str = localStorage.getItem(STORAGE_KEYS.cart);
  
        if(str == null){
            return null;
        }else{
            return JSON.parse(str);
        }
      }
  
      setCart(obj: Carts){
         if(obj == null){
             localStorage.removeItem(STORAGE_KEYS.cart);
         } else {
             localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
         }
      }
}