import { Component } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent {
  customers: Customer[] = [
    {
      natIdNumber: '232323',
      customerId: '3232323',
      accountNumber: '3243243',
      gsmNumber: '21321',
      firstName: 'mdskfdkf',
      lastName: 'kdmfkdmf',
      orderNumber: 'kdmfkdf',
    },
    {
      natIdNumber: '232323',
      customerId: '3232323',
      accountNumber: '3243243',
      gsmNumber: '21321',
      firstName: 'mdskfdkf',
      lastName: 'kdmfkdmf',
      orderNumber: 'kdmfkdf',
    },
    {
      natIdNumber: '232323',
      customerId: '3232323',
      accountNumber: '3243243',
      gsmNumber: '21321',
      firstName: 'mdskfdkf',
      lastName: 'kdmfkdmf',
      orderNumber: 'kdmfkdf',
    },
    {
      natIdNumber: '232323',
      customerId: '3232323',
      accountNumber: '3243243',
      gsmNumber: '21321',
      firstName: 'mdskfdkf',
      lastName: 'kdmfkdmf',
      orderNumber: 'kdmfkdf',
    },
  ];
}
