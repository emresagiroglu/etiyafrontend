import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { ButtonComponent } from '../button/button.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonComponent,
    ButtonComponent,
    PopupComponent,
  ],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.scss',
})
export class CustomerCreateComponent {
  customerForm: FormGroup; // Reactive Form için FormGroup
  selectedGender: string = ''; // Gender dropdown için bir state
  selectedOption: string = 'all'; // Varsayılan olarak tüm inputlar açık

  handleGenderChange(event: any) {
    this.selectedGender = event.target.value;
    console.log(`Selected gender: ${this.selectedGender}`);
  }

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: ['', [Validators.required, Validators.minLength(3)]],
      motherName: ['', [Validators.required, Validators.minLength(3)]],
      nationalityId: ['', [Validators.required, Validators.minLength(11)]],
    });
  }

  options = [
    { label: 'Turkish', value: 'all' },
    { label: 'Other', value: 'hide' },
  ];

  handleButtonClick() {
    if (this.customerForm.invalid) {
      // Form geçersiz ise uyarı verelim
      this.customerForm.markAllAsTouched(); // Tüm alanları dokunulmuş (touched) olarak işaretliyoruz
      alert('Please fill out all required fields correctly.');
      return;
    }
    console.log('Form Submitted:', this.customerForm.value);
  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
