import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerCncinfoService } from '../../services/customer-cncinfo.service';
import { CustomerCncInfoResponse } from '../../models/customer/customerCncInfoResponse';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  customer: CustomerCncInfoResponse = {} as CustomerCncInfoResponse;


  constructor(
    private customerCncInfoService: CustomerCncinfoService,
    private route: ActivatedRoute // ActivatedRoute servisini ekleyin
  ) {}

  ngOnInit(): void {
    // URL'den 'id' parametresini alıyoruz
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.getCustomer(Number(customerId)); // API isteğini yapıyoruz
    }
  }

  getCustomer(id: number) {
    this.customerCncInfoService.getCustomerById({ id }).subscribe((response) => {
      this.customer = response;
    });
  }
}
