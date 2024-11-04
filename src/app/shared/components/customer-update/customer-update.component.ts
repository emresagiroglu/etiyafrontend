import { CustomerCncRequest } from './../../models/customer/customerCncRequest';
import { Component, OnInit } from '@angular/core';
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
import { CustomerIdService } from '../../services/customer-service/customer-id.service';
import { CustomerCncService } from '../../services/customer-service/customer-cnc.service';
import { Router } from '@angular/router';

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
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss'], // styleUrl düzeltildi
})
export class CustomerUpdateComponent implements OnInit {
  customerUpdateForm: FormGroup;
  selectedGender: string = ''; 
  selectedOption: string = 'all';
  currentCustomerId! : number;

  constructor(private fb: FormBuilder, private customerIdService : CustomerIdService, 
    private customerCncService : CustomerCncService, private router : Router) {
    this.customerUpdateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      fax: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      homePhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
    this.currentCustomerId = this.customerIdService.customerId;
  }
  ngOnInit(): void {
    console.log(this.currentCustomerId)
  }

  handleButtonClick() {
    if (this.customerUpdateForm.invalid) {
      this.customerUpdateForm.markAllAsTouched(); 
      alert('Please fill out all required fields correctly.');
      return;
    }
    const customerCncRequest: CustomerCncRequest = {
      customerId : this.currentCustomerId,
      contactName : "",
      email: this.customerUpdateForm.get('email')?.value,
      homePhone: this.customerUpdateForm.get('homePhone')?.value,
      mobilePhone: this.customerUpdateForm.get('phone')?.value,
      fax: this.customerUpdateForm.get('fax')?.value,
    }
    this.customerCncService.createCncInfo(customerCncRequest).subscribe({
      next: (response) => {
        if(response.customerId != null) {
          this.router.navigate(['/customer-search']);
        }
      }
    })
  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleExit() {
    console.log('Exiting...');
  }

  handlePrevious() {
    // Önceki adıma gitme işlemi
    console.log('Going to previous step...');
  }

  handleSave() {
    this.handleButtonClick(); // Formu kaydetme işlemi
  }
}