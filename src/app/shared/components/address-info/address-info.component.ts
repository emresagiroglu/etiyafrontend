import { AddressRequest } from './../../models/customer/address/AddressRequest';
import { DistrictRequest } from './../../models/customer/address/DistrictRequest';
import { CityResponse } from './../../models/customer/address/CityResponse';
import { AddressService } from './../../services/customer-service/address.service';
import { CityRequest } from './../../models/customer/address/CityRequest';
import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators,ReactiveFormsModule, NgForm } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { Observable } from 'rxjs';
import { NeighbourhoodRequest } from '../../models/customer/address/NeighbourhoodRequest';
import { AddressResponse } from '../../models/customer/address/AddressResponse';



@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [
    PopupComponent,
    ButtonComponent,
    RadioButtonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
})
export class AddressInfoComponent implements OnInit{
  showModal: boolean = false;
  showExitPopup: boolean = false;
  addresses: AddressResponse[] = []; // Adresleri saklamak için dizi
  addressForm : FormGroup;


  constructor(private formBuilder : FormBuilder, private addressService: AddressService)
  {
    this.addressForm = this.formBuilder.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
      district: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      houseFlat: ['', [Validators.required, Validators.minLength(2)]],
      neighbourhood: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

ngOnInit(): void {
this.getAllAddresses();
console.log(this.addresses)

}
  newAddress = {
    neighborhood: '',
    street: '',
    houseFlat: '',
    district: '',
    city: '',
    description: '',
  }; // Yeni adres form verisi

  handleButtonClick() {
    this.showExitPopup = true;
  }

  openModal() {
    this.showModal = true;
 
  }

  getAllAddresses(){
    this.addressService.getAllAddressByCustomerId(100000000002).subscribe({
      next: (response : AddressResponse[]) => {
          this.addresses = response;
      }
    })
  }

  closeModal() {
    this.showModal = false;
    this.showExitPopup = false;
  }

  saveAddress() {
    /*// Form verisini adres listesine ekle
    this.addresses.push({ ...this.newAddress });

    // Formdaki verileri sıfırla
    this.newAddress = {
      neighborhood: '',
      street: '',
      houseFlat: '',
      district: '',
      city: '',
      description: '',
    };

    // Popup'ı kapat
    this.closeModal(); */


    if(this.addressForm.valid){
      console.log("success")
      this.createAddressInit();
    }

  }

  selectedOption: string = 'all';

  options = [{ label: 'Primary Address', value: 'all' }];

  onSubmit(form: NgForm) {
    // Tüm alanlar doluysa ve form geçerliyse adresi kaydet
    if (form.valid) {
      this.saveAddress();

    }
  }
  createAddressInit(){
    
    const cityRequest :CityRequest= {
      name : this.addressForm.get('city')?.value
    }
    this.createAddress(cityRequest);
    
  }

  createAddress(cityRequest : CityRequest)  {
    this.addressService.createCity(cityRequest).subscribe({
      next: (response) => {
        const districtRequest : DistrictRequest ={
          name: this.addressForm.get('district')?.value,
          cityId: response.cityId
        }
        this.addressService.createDistrict(districtRequest).subscribe({
          next:(response) => {
            const neighbourhoodRequest: NeighbourhoodRequest = {
              name: this.addressForm.get('neighbourhood')?.value,
              districtId: response.id
            }
            this.addressService.createNeighbourhood(neighbourhoodRequest).subscribe({
              next: (response) => {
                const addressRequest : AddressRequest = {
                  customerId:100000000002,
                  neighbourhoodId: response.id,
                  addressName:'-',
                  addressDesc:this.addressForm.get('description')?.value,
                  street:this.addressForm.get('street')?.value,
                  houseNumber:this.addressForm.get('houseFlat')?.value
                }
                this.addressService.createAddress(addressRequest).subscribe({
                  next:(response) => {
                    console.log(response)
                    this.closeModal()
                  }
                })
              }
            })
          }
        })
        

      }
    })
  }

}
