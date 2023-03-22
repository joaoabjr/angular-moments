import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent {
  @Input() btnText!: string; //passado pelo componente pai (onde chama o moment-form, que nesse caso é o new-moment)
}
