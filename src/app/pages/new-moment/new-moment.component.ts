import { Component } from '@angular/core';
import { Moment } from 'src/app/components/interfaces/Moments';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-new-moment',
	templateUrl: './new-moment.component.html',
	styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
	btnText: string = 'Compartilhar';

	constructor(
		private momentService: MomentService,
		private messagesService: MessagesService,
		private router: Router
	) {}

	async createHandler(moment: Moment) {
		const formData = new FormData();

		formData.append('title', moment.title);
		formData.append('description', moment.description);

		// verifica se recebe imagem
		if (moment.image) {
			formData.append('image', moment.image);
		}

		// método post para criar momento no banco
		await this.momentService.createMoment(formData).subscribe();

		// mensagem de sucesso ao adicionar momento
		this.messagesService.add('Momento adicionado com sucesso!');

		// redirect para home após criar o momento
		this.router.navigate(['/']);
	}

	/*
	 * DONE:
	 * 1. Enviar dados para o Service
	 * 2. Terminado o sistema de mensagens para o usuário (ao adicionar momento, erro, etc.)
	 */
}
