import { Component } from '@angular/core';
import { Moment } from 'src/app/components/interfaces/Moments';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText: string = "Compartilhar"

  constructor(private momentService: MomentService) {}

  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description);
    
    // verifica se recebe imagem
    if(moment.image){
      formData.append('image', moment.image);
    }

    await this.momentService.createMoment(formData).subscribe();
  }
  
  /* 
  TODO:
    1. Enviar os dados para o Service (e poder cadastrar no banco), 2. Exibir mensagens para usuário e 3. Redirect para outra página
  */

}
