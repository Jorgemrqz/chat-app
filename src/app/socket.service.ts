import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | undefined;

  constructor() {
    this.initializeSocketConnection();
  }

  private initializeSocketConnection(): void {
    this.socket = io('http://localhost:3000'); // Cambia el puerto si usaste otro
  }

  sendMessage(message: string): void {
    if (this.socket) {
      this.socket.emit('message', message);
    } else {
      console.error('Socket no está inicializado.');
    }
  }

  getMessages(): Observable<string> {
    return new Observable(observer => {
      if (this.socket) {
        this.socket.on('message', (message: string) => {
          observer.next(message);
        });
      } else {
        console.error('Socket no está inicializado.');
      }
    });
  }
}
