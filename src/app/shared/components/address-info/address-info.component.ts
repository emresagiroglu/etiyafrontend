import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [PopupComponent, ButtonComponent, CommonModule],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
})
export class AddressInfoComponent {
  showModal: boolean = false;

  handleButtonClick() {}

  openModal() {
    this.showModal = true;
    console.log(this.showModal);
  }

  closeModal() {
    this.showModal = false;
  }
}
