import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from '../interfaces/Moments';

@Component({
	selector: 'app-moment-form',
	templateUrl: './moment-form.component.html',
	styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent {
	@Output() onSubmit = new EventEmitter<Moment>();
	@Input() btnText!: string; //passado pelo componente pai (onde chama o moment-form, que nesse caso é o new-moment)
	@Input() momentData: Moment | null = null;

	momentForm!: FormGroup;

	ngOnInit(): void {
		this.momentForm = new FormGroup({
			id: new FormControl(this.momentData ? this.momentData.id : ''),
			title: new FormControl(this.momentData ? this.momentData.title : '', [
				Validators.required,
			]),
			description: new FormControl(
				this.momentData ? this.momentData.description : ''
			),
			image: new FormControl(''),
		});
	}

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		this.momentForm.patchValue({ image: file });
	}

	// função para pegar o title do formulário, por exemplo
	get title() {
		return this.momentForm.get('title')!;
	}

	get description() {
		return this.momentForm.get('description')!;
	}

	submit(): void {
		if (this.momentForm.invalid) {
			return;
		}
		console.log(this.momentForm.value);
		this.onSubmit.emit(this.momentForm.value); // enviando os dados pro formulário do componente pai
	}
}
