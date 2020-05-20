import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatService } from '../chat.service';
import { AuthService } from '../shared/services/auth.service';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;
  userChats$;
  chat_id;
  symptoms: string;
  recommendation = '';

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private req: Http
  ) {}

  ngOnInit() {
    this.userChats$ = this.cs.getUserChats();
    const chatId = this.route.snapshot.paramMap.get('id');
    this.chat_id = chatId;
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source); // .pipe(tap(v => this.scrollBottom(v)));
    this.chat$.subscribe(chat => console.log(chat));
    this.scrollBottom();
  }

  submit(chatId) {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.cs.sendMessage(chatId, this.newMsg);
    this.newMsg = '';
    this.scrollBottom();
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  getDisease(chat_id) {
    const url = 'http://127.0.0.1:8000/api/recom';
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const opts = new RequestOptions();
    opts.headers = headers;
    const data = {
      'dstr': this.symptoms
    };
    this.req.post(url, data, opts)
      .toPromise().then(resp => {
        console.log(resp.text());
        this.cs.updateDisease(chat_id, resp.text());
      });

      this.symptoms = '';
  }

}
