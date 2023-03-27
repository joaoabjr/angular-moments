import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/components/interfaces/Moments';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment.development';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  allMoments: Moment[] = []; // para puxar todos os momentos do banco
  moments: Moment[] = []; // para ser aplicado o filtro com o que o usuário deseja
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService){}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      });
      this.allMoments = data;
      this.moments = data;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) => {
      return moment.title?.toLocaleLowerCase().includes(value);
    });
  }
}
