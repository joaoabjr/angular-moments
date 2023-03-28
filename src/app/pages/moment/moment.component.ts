import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/components/interfaces/Moments';
import { MomentService } from 'src/app/services/moment.service';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { Comment } from 'src/app/components/interfaces/Comments';

import {
	FormGroup,
	FormGroupDirective,
	FormControl,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'app-moment',
	templateUrl: './moment.component.html',
	styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
	moment?: Moment;
	baseApiUrl = environment.baseApiUrl;
	commentForm!: FormGroup;

	// icons
	faTimes = faTimes;
	faEdit = faEdit;

	constructor(
		private momentService: MomentService,
		private messagesService: MessagesService,
		private commentService: CommentService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'));

		this.momentService
			.getMoment(id)
			.subscribe((item) => (this.moment = item.data));

		this.commentForm = new FormGroup({
			text: new FormControl('', [Validators.required]),
			username: new FormControl('', [Validators.required]),
		});
	}

	get text() {
		return this.commentForm.get('text')!;
	}

	get username() {
		return this.commentForm.get('username')!;
	}

	async onSubmit(formDirective: FormGroupDirective) {
		if (this.commentForm.invalid) {
			return;
		}

		const data: Comment = this.commentForm.value;
		data.momentId = Number(this.moment!.id);

		await this.commentService.createComment(data).subscribe((comment) => {
			return this.moment!.comments!.push(comment.data);
		});

		this.messagesService.add('Comentário adicionado!');

		// reset do form
		this.commentForm.reset();

		formDirective.resetForm();
	}

	async removeHandler(id: number) {
		if (id) {
			await this.momentService.removeMoment(id).subscribe();
			this.messagesService.add('Momento excluído com sucesso!');
			this.router.navigate(['/']);
		}
	}
}
