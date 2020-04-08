import {Component, OnInit} from '@angular/core';
import {AdminRequestService} from '../../core/services/admin-request.service';
import {StatusService} from '../../core/services/status.service';
import {Observable} from 'rxjs';
import {RequestTypeService} from '../../core/services/request-type.service';
import {Request} from '../../shared/models/request';
import {RequestType} from '../../shared/models/request-type';
import {Status} from 'src/app/shared/models/status';
import {SelectItem} from 'primeng/components/common/selectitem';
import {DropdownModule} from 'primeng/dropdown';
import {HttpClient} from '@angular/common/http';
import {RequestPageModel} from 'src/app/shared/models/request-page-model';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

  status: SelectItem[];

  requests: Request[];

  statusList: Status[] = [];

  selectedStatus: Status;

  sortBys: SelectItem[];

  sizeArray: number;

  requestPageModel: RequestPageModel;

  constructor(
    private adminRequestService: AdminRequestService,
    private statusService: StatusService,
    private requestTypeService: RequestTypeService,
    private httpClient: HttpClient
  ) {
    this.requestPageModel = new RequestPageModel();

    this.requestPageModel.page = 0;

    this.requestPageModel.items = 2;

    this.sortBys = [
      {label: 'Create At', value: 'Create At'},
      {label: 'Email', value: 'Email'},
      {label: 'Request Type', value: 'Request Type'},
      {label: 'Status', value: 'Status'}
    ];

    this.requestPageModel.search = '';

    this.requestPageModel.sortBy = 'Create At';
  }

  ngOnInit() {
    this.sendRequestPage();
    this.getStatus();
    this.getSize();
  }

  getStatus() {
    this.statusService.getStatusList().subscribe(listStatus => {
      this.statusList = listStatus;

      this.status = this.statusList.map(o => {
        return {label: o.name.toString(), value: o}
      })
    })
  }

  putRequest(request: Request) {
    this.adminRequestService.putRequest(request);
  }

  onChange(event, request: Request) {
    this.adminRequestService.putRequest(request).subscribe(pu => console.log(pu));
  }

  getSize() {
    this.adminRequestService.getSize(this.requestPageModel.search).subscribe(size => {
      this.sizeArray = size;
    });
  }

  requestPage(event) {
    this.requestPageModel.items = event.rows;
    this.requestPageModel.page = event.page;
    this.sendRequestPage();
  }

  sendRequestPage() {
    this.adminRequestService.getPageRequest(this.requestPageModel).subscribe(request => {
      this.requests = request;
      this.getSize();
    });
  }

  changeSortBy(event) {
    this.requestPageModel.sortBy = event.value;
    this.sendRequestPage();
  }

  searchRequest() {
    this.requestPageModel.page = 0;
    this.sendRequestPage();
  }
}
