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
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerUpdateService } from '../../services/customer-update.service';
import { CustomerUpdateRequest } from '../../models/customer/customerUpdateRequest';
import { CustomerUpdateResponse } from '../../models/customer/customerUpdateResponse';

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
  styleUrls: ['./customer-update.component.scss'], 
})
export class CustomerUpdateComponent implements OnInit{
  customerUpdateForm: FormGroup;
  customerId: number | null = null;  // Müşteri kimliğini tutmak için bir değişken
  customer: CustomerUpdateResponse | null = null;  // Güncellenmiş müşteri bilgileri

  constructor(
    private fb: FormBuilder , 
    private router: Router ,
    private customerUpdateService : CustomerUpdateService,
    private route: ActivatedRoute ) {
   
      this.customerUpdateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      fax: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      homePhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
     
    });
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.customerId = +params.get('id')!; 
      // Burada müşteri bilgilerini yüklemek için bir API çağrısı yapabilirsiniz
      // this.loadCustomerData(this.customerId);
    });
  }

  handleButtonClick() {
    if (this.customerUpdateForm.invalid) {
      this.customerUpdateForm.markAllAsTouched();
      alert('Please fill out all required fields correctly.');
      return;
    }

    console.log('Form Submitted:', this.customerUpdateForm.value);

    const customerUpdateRequest: CustomerUpdateRequest = {
      id: this.customerId!,
      email: this.customerUpdateForm.value.email,
      phone: this.customerUpdateForm.value.phone,
      fax: this.customerUpdateForm.value.fax,
      homePhone: this.customerUpdateForm.value.homePhone,
    };

    // Call the updateCustomer method from the service
    this.customerUpdateService.updateCustomer(customerUpdateRequest).subscribe({
      next: (response: CustomerUpdateResponse) => {
        console.log('Customer updated successfully:', response);
        this.router.navigate(['/success']); // Change '/success' to your desired route
      },
      error: (err) => {
        console.error('Error updating customer:', err);
        alert('An error occurred while updating the customer. Please try again.');
      }
    });
  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleExit() {
    console.log('Exiting...');
  }

  handlePrevious() {
    console.log('Going to previous step...');
  }

  handleSave() {
    this.handleButtonClick(); 
  }

  goToSearch() {
    this.router.navigate(['/customer-search']);
  }
}