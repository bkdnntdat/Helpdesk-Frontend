import { Component, OnInit } from "@angular/core";
import { RequestUserService } from "./service/request-user.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/core/services/auth.service";
import { Request } from "../../shared/models/request";
import { Profile } from "selenium-webdriver/firefox";
@Component({
  selector: "app-request-user",
  templateUrl: "./request-user.component.html",
  styleUrls: ["./request-user.component.scss"]
})
export class RequestUserComponent implements OnInit {
  public requestTypes;
  public selectedRequestType;
  public description: string;
  public selectedDate;
  public validateScope;
  public requestsOfMe : Request[];
  footerRender: any;
  constructor(
    public requestUserService: RequestUserService,
    public message: NzMessageService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadListRequestType();
    this.initValidateScope();
    this.getRequestOfMe();
  }

  initValidateScope() {
    this.validateScope = {
      requestType: false,
      description: false,
      selectedDate: false
    };
  }
  loadListRequestType() {
    this.requestUserService.getAllRequestType().subscribe(
      data => {
        this.requestTypes = data;
      },
      err => {
        this.message.error("load list request type");
      }
    );
  }

  async onClickSendRequest() {
    if (!this.validateSendRequest()) {
      this.message.loading("Watting for request sending.....");
      let profile = await this.getProfileOfUser();
      let requestType = this.getTypeRequestFromId(this.selectedRequestType);
      
      if (profile) {
        const request = new Request({
          user: profile,
          dayRequest: this.selectedDate,
          description: this.description,
          requestType: requestType
        });

        this.requestUserService.postRequest(request).subscribe(
          data => {
            this.message.success("send request success");
            this.selectedDate = "";
            this.description = "";
            this.selectedRequestType = null;
          },
          error => {
            this.message.error("Send request error");
          }
        );
      }
    }
  }

  async getProfileOfUser(): Promise<any> {
    let result = await this.authService.getProfileCurrent().toPromise();
    return result;
  }

  getTypeRequestFromId(id: number) {
    return this.requestTypes.find(item => {
      return item.id == id;
    });
  }

  validateSendRequest(): boolean {
    this.initValidateScope();

    if (!this.selectedRequestType) {
      this.message.error(
        "Request type is null. Please shoose date Request type"
      );
      this.validateScope.requestType = true;
    }
    if (!this.description || !this.description.trim()) {
      this.message.error("description error empty. Please enter description");
      this.validateScope.description = true;
      this.description = "";
    }

    if (!this.selectedDate) {
      this.message.error("Date is null. Please shoose date request");
      this.validateScope.selectedDate = true;
    }

    if (
      this.validateScope.requestType ||
      this.validateScope.description ||
      this.validateScope.selectedDate
    ) {
      return true;
    }
    return false;
  }

  getRequestOfMe(){
    this.requestUserService.getRequestOfMe().subscribe((_:any) => this.requestsOfMe = _);
  }
}
