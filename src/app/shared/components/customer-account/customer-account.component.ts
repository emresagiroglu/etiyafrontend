import { Component } from '@angular/core';
import { AccountTableComponent } from '../account-table/account-table.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [AccountTableComponent, CommonModule, ButtonComponent],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.scss',
})
export class CustomerAccountComponent {
  handleClick() {}
}
