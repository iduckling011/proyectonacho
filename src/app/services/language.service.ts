import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = 'es';
  private translations: any = {};
  public onLangChange = new BehaviorSubject<string>('es');

  constructor(private http: HttpClient) {
    this.loadLanguage('es');
  }

  loadLanguage(lang: string) {
    this.currentLang = lang;
    this.http.get(`./assets/i18n/${lang}.json`).subscribe(data => {
      this.translations = data;
      this.onLangChange.next(lang);
    });
  }

  get(key: string): string {
    const keys = key.split('.');
    let result = this.translations;
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  }

  getCurrentLang(): string {
    return this.currentLang;
  }
}