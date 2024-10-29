import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { ButtonComponent } from '../button/button.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RadioButtonComponent,
    ButtonComponent,
    PopupComponent,
  ],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.scss',
})
export class CustomerCreateComponent {
  selectedGender: string = ''; // Gender dropdown için bir state

  handleGenderChange(event: any) {
    this.selectedGender = event.target.value;
    console.log(`Selected gender: ${this.selectedGender}`);
  }

  selectedOption: string = 'all'; // Varsayılan olarak tüm inputlar açık

  options = [
    { label: 'Turkish', value: 'all' },
    { label: 'Other', value: 'hide' },
  ];

  handleButtonClick() {}

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
