import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  data: Category[];
  isVisible = false;
  value: Category;
  edit: boolean;
  suffixIconButton: any;
  suffixTemplateInfo: any;
  editCache: { [key: string]: { edit: boolean; data: Category } } = {};

  constructor(
    private route: Router,
    private categoryService: CategoryService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  showModal(): void {
    this.isVisible = true;
  }

  createNew(name: string): void {
    if (!name || name.trim() === '') {
      this.message.warning('Please input again name of category');
      return;
    }
    this.categoryService.addCategory(name).subscribe(data => {
      this.getCategories();
    });

    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.data = data;
      this.updateEditCache();
    });
  }

  showDeleteConfirm(currentData: Category): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this category?',
      nzContent: '<b style="color: red;">This action can be dangerous</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.data = this.data.filter(c => c !== currentData);
        this.categoryService.deleteCategory(currentData).subscribe();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  search(valueSearch: string): void {
    this.categoryService
      .searchCategory(valueSearch)
      .subscribe(data => (this.data = [...data]));
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    this.getCategories();
  }

  saveEdit(currentData: Category): void {
    this.categoryService.updateCategory(currentData).subscribe();
    this.editCache[currentData.id].edit = false;
  }

  updateEditCache(): void {
    this.data.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
