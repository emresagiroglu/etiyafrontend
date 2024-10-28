import { Component } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { CustomerTableComponent } from '../customer-table/customer-table.component';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-search',
  standalone: true,
  imports: [
    TabsComponent,
    InputComponent,
    ButtonComponent,
    CustomerTableComponent,
    PopupComponent,
    CommonModule,
  ],
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss',
})
export class CustomerSearchComponent {
  tabs: string[] = ['B2C', 'B2B'];

  activeTab: number = 0;

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleButtonClick() {}
}
