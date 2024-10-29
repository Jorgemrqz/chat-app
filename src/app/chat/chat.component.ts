import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  socket: any;
  messages: string[] = [];
  message: string = '';

  ngOnInit() {
    // Conectar al servidor WebSocket
    this.socket = io('http://localhost:3000');
    
    // Recibir mensajes
    this.socket.on('message', (msg: string) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      // Enviar mensaje al servidor
      this.socket.emit('message', this.message);
      this.message = '';
    }
  }
}
