import { Component, VERSION, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  public books: any[];

  public constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    const books1 = this.http.get('/first-book-source');
    const books2 = this.http.get('/second-book-source');

    merge(books1, books2).subscribe((data: any) => {
      if (!this.books) {
        this.books = data;
      } else {
        this.books.push(...data);
      }
    });
  }

  public getName(data: any): string {
    return data.name;
  }

  public getAuthors(data: any): string {
    if (data.author) {
      return data.author;
    } else if (data.authors) {
      return Array.from(data.authors).join(', ');
    }
  }

  public getDonePages(data: any): number {
    if (data.pages) {
      return Number(data.pages);
    } else {
      return data.pagesDone;
    }
  }

  public getTotalPages(data: any): number {
    if (data.total) {
      return Number(data.total);
    } else {
      return data.totalPages;
    }
  }

  public getStatus(data: any): string {
    const done = this.getDonePages(data);
    const total = this.getTotalPages(data);

    if (done === 0) {
      return 'Буду читать';
    } else if (done === total) {
      return 'Прочитана';
    } else {
      return 'Читаю';
    }
  }

  private getStartTime(data: any): Date {
    return data.dateOfStart
      ? new Date(data.dateOfStart)
      : new Date(data.started);
  }

  private getFinishTime(data: any): Date {
    return data.dateOfEnd ? new Date(data.dateOfEnd) : new Date(data.finished);
  }

  public getReadingTime(data: any): string {
    const started = this.getStartTime(data);
    const finished = this.getFinishTime(data);

    return (
      (finished.getTime() - started.getTime()) / 1000 / 60 / 60 / 24 + ' дней'
    );
  }

  public trackBy(index: number, item: any): number {
    return index;
  }
}
