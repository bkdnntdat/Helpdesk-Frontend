import { Component, OnInit } from '@angular/core';
import { RequestTypeService } from 'src/app/core/services/request-type.service';
import { RequestType } from 'src/app/shared/models/request-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrls: ['./request-type.component.scss']
})
export class RequestTypeComponent implements OnInit {
  listRequestType: RequestType[];

  nameRequestTypeAdd: string;

  requestTypeEdit: RequestType;

  editId: number;

  isVisibleModalDelete = false;

  deleteId : number;

  constructor(
    private requestTypeService: RequestTypeService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.getRequestTypes();
  }

  getRequestTypes() {
    this.requestTypeService.getRequestTypes().subscribe(requestTypes => {
      this.listRequestType = requestTypes;
    });
  }

  postRequestType() {
    this.requestTypeService
      .postRequestType(this.nameRequestTypeAdd)
      .subscribe(_ => {
        this.listRequestType.push(_);
        this.nameRequestTypeAdd = null;
      });
  }

  deleteRequestType(id: number) {
    this.isVisibleModalDelete = true;
    this.deleteId = id;
  }

  putRequestType(requestType: RequestType) {
    this.requestTypeService
      .putRequestType(requestType)
      .subscribe((requestTypes: any) => {
        this.listRequestType = requestTypes;
        this.editId = -1;
      });
  }

  setEditId(id: number) {
    this.editId = id;
  }

  handleOkDelete(): void {
    this.requestTypeService.deleteRequestType(this.deleteId).subscribe(_ => {
      this.listRequestType = this.listRequestType.filter(
        requestType => requestType.id !== this.deleteId
      );
    });
    this.isVisibleModalDelete = false;
  }

  handleCancelDelete(): void {
    this.isVisibleModalDelete = false;
  }
}
