import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowUserService } from './service/show-user/show-user.service';
import { Profile } from '../../shared/models/profile';
import { EditUserService } from './service/edit-user/edit-user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  public users: Profile[];
  public valueSearch: string;
  public allUser: Profile[];
  public sortEmailCurrent: string;

  constructor(
    public showUserService: ShowUserService,
    public editUserService: EditUserService,
    public message: NzMessageService
  ) {}

  public ngOnInit() {
    this.loadListUser();
  }

  public checkNameSkillIsExistInLocalStorage() {
    if (localStorage.getItem('skill')) {
      this.valueSearch = localStorage.getItem('skill');
      localStorage.removeItem('skill');
      this.search();
    }
  }

  public loadListUser() {
    this.showUserService.getListProfile().subscribe(
      data => {
        this.allUser = data;
        this.users = [...this.allUser];
        this.checkNameSkillIsExistInLocalStorage();
      },
      error => {
        this.message.error('[ERROR] load list user');
      }
    );
  }

  public onDisableUser(user: Profile) {
    this.editUserService.disableFollowIdUser(user.id).subscribe(
      data => {
        this.reverseStatusOfUser(user);
      },
      error => {
        this.message.error('[ERROR] on disable user');
      }
    );
  }

  public onEnableUser(user: Profile) {
    this.editUserService.enableFollowIdUser(user.id).subscribe(
      data => {
        this.reverseStatusOfUser(user);
      },
      error => {
        this.message.error('[ERROR] On enable user');
      }
    );
  }

  public reverseStatusOfUser(user: Profile) {
    for (let i = 0; i < this.users.length; ++i) {
      if (this.users[i].id === user.id) {
        this.users[i].enable = !this.users[i].enable;
        break;
      }
    }
  }

  public sortName(event) {
    this.users = [...this.users];
    if (event == 'ascend') {
      this.users.sort(function(a, b) {
        var nameA = a.lastName.toUpperCase();
        var nameB = b.lastName.toUpperCase();
        return nameA.localeCompare(nameB);
      });
    } else if (event == 'descend') {
      this.users.sort(function(a, b) {
        var nameA = a.lastName.toUpperCase();
        var nameB = b.lastName.toUpperCase();
        return nameB.localeCompare(nameA);
      });
    } else {
      this.users.sort(function(a, b) {
        if (a.id === b.id) {
          return 0;
        }
        return a > b ? 1 : -1;
      });
    }
    this.sortEmailCurrent = event;
  }

  public sortEmail(event) {
    this.users = [...this.users];
    if (event === 'ascend') {
      this.users.sort(function(a, b) {
        var nameA = a.email.toUpperCase();
        var nameB = b.email.toUpperCase();
        return nameA.localeCompare(nameB);
      });
    } else if (event === 'descend') {
      this.users.sort(function(a, b) {
        var nameA = a.email.toUpperCase();
        var nameB = b.email.toUpperCase();
        return nameB.localeCompare(nameA);
      });
    } else {
      this.users.sort(function(a, b) {
        if (a.id === b.id) {
          return 0;
        }
        return a > b ? 1 : -1;
      });
    }
    this.sortEmailCurrent = event;
  }

  public search() {
    let litsUserSearch: Profile[];
    this.users = this.allUser.filter(user => {
      if (
        user.email.includes(this.valueSearch) ||
        user.firstName.includes(this.valueSearch) ||
        user.lastName.includes(this.valueSearch) ||
        this.checkSkillIsExistInUsers(user, this.valueSearch)
      ) {
        return user;
      }
    });
    this.sortEmail(this.sortEmailCurrent);
  }

  public checkSkillIsExistInUsers(user: Profile, nameSkill: string): boolean {
    let isExist: boolean = false;
    user.skills.forEach(skill => {
      if (skill.name.includes(nameSkill)) {
        isExist = true;
        return;
      }
    });
    return isExist;
  }

  reset() {
    this.users = this.allUser;
  }
}
