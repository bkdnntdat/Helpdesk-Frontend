import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/core/services/skill.service';
import { Router } from '@angular/router';
import { Skill } from 'src/app/shared/models/skill';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../core/services/category.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  data: Skill[];
  isVisible = false;
  cateValues: Category[];
  isLoading = false;
  edit: boolean;
  id: number;
  skills: Skill[];
  skillForm: FormGroup;
  skillEditForm: FormGroup;
  submitted = false;
  categories: Category;
  categoryId: number;
  suffixIconButton: any;
  suffixTemplateInfo: any;

  constructor(
    private alertService: AlertService,
    private skillService: SkillService,
    private router: Router,
    private cateService: CategoryService,
    private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) {}

  get f() {
    return this.skillForm.controls;
  }

  ngOnInit() {
    this.getSkills();
    this.getCategory();

    this.skillForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      categories: [null, [Validators.required]]
    });

    this.skillEditForm = this.formBuilder.group({
      id: [this.id, [Validators.required]],
      name: ['', [Validators.required]],
      categories: [Category, [Validators.required]]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  getSkills(): void {
    this.skillService.getSkills().subscribe(data => (this.data = data));
  }

  getCategory(): void {
    this.cateService
      .getCategories()
      .subscribe(cateValues => (this.cateValues = cateValues));
  }

  onSubmit() {
    this.submitted = true;
    if (this.isPassValidateFormAddNewSkill()) {
      this.skillService.addSkill(this.skillForm.value).subscribe(
        data => {
          this.message.success('Create new skill success!');
          this.skillForm.reset();
          this.getSkills();
          this.isVisible = false;
        },
        error => {
          this.alertService.error('error');
        }
      );
    }
  }

  isPassValidateFormAddNewSkill() {
    for (const i in this.skillForm.controls) {
      this.skillForm.controls[i].markAsDirty();
      this.skillForm.controls[i].updateValueAndValidity();
    }
    if (!this.skillForm.valid) {
      this.message.warning('Please enter full the infomation!');
      return false;
    }
    return true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(currentData: Skill): void {
    this.modalService.confirm({
      nzTitle: "Are you sure delete this skill?",
      nzContent: "<b style='color: red;'>This action can be dangerous</b>",
      nzOkText: "Yes",
      nzOkType: "danger",
      nzOnOk: () => {
        this.data = this.data.filter(c => c !== currentData);
        this.skillService.deleteSkill(currentData).subscribe();
      },
      nzCancelText: 'No'
    });
  }

  startEdit(id: number) {
    this.edit = true;
  }

  cancelEdit(id: number) {
    const index = this.data.findIndex(c => c.id === id);
    this.edit = false;
  }

  saveEdit(skill: Skill): void {
    this.skillService.updateSkill(skill).subscribe();
    this.edit = false;
  }

  search(value: number): void {
    if (!value) {
      this.skillService.getSkills().subscribe(data => (this.data = data));
    } else {
      this.skillService
        .searchSkill(value)
        .subscribe(data => (this.data = [...data]));
    }
  }

  onClickToUserHaveSkill(nameSkill: string) {
    localStorage.setItem('skill', nameSkill);
    let url = '/admin/users';
    this.router.navigate([url]).then();
  }
}
