import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: string[] = [];
  message: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    // Recibir mensajes a través del servicio
    this.socketService.getMessages().subscribe((msg: string) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      // Añadir el mensaje localmente para verlo de inmediato
     // this.messages.push(this.message);
      
      // Enviar el mensaje al servidor mediante el servicio
      this.socketService.sendMessage(this.message);
      this.message = ''; // Limpiar el campo de entrada
    }
  }
}
