import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  set(key:string,data:any){
    try {
      localStorage.setItem(key,JSON.stringify(data))
    }catch (e) {
      console.error('Error saving to localStorage',e)
    }
  }

  get(key:string){
    try {
      return JSON.parse(localStorage.getItem(key))
    }catch (e) {
      console.error(e)
      return null
    }
  }
}
