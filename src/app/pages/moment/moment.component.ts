import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/components/interfaces/Moments';
import { MomentService } from 'src/app/services/moment.service';
import { Route, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit{
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private momentService: MomentService, private route: ActivatedRoute){}

  removeHandler(id: number) {
  
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
    .getMoment(id)
    .subscribe(item => this.moment = item.data);

  }
}