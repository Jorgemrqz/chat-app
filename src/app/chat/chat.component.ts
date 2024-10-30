// src/app/chat/chat.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../socket.service';

// Interfaz para los mensajes de chat
interface ChatMessage {
  user: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  message: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    // Recibir mensajes a través del servicio y agregar a la lista
    this.socketService.getMessages().subscribe((msg: ChatMessage) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.message);
      this.message = ''; // Limpiar el campo de entrada
    }
  }
}
