import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../core/services/alert.service';
import {RequestService} from '../../core/services/request.service';
import {Request} from '../../shared/models/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  data: Request[];
  isVisible = false;

  constructor(
    private alertService: AlertService,
    private requestService: RequestService
  ) {
  }

  ngOnInit() {
    this.getRequests();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getRequests(): void {
    this.requestService.getRequests().subscribe(data => this.data = data);
  }

}
