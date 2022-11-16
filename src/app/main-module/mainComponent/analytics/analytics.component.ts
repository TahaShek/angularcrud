import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Shared/Service/product.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
product:any=[]
particularProductData:any={}
Url='http://localhost:2222/'
updateForm:FormGroup|any;
// makeidPublic:any;
myId:any

  constructor(private service:ProductService,private toaster:ToastrService,private formbuilder:FormBuilder) {
    this.updateformModel()
   }

  ngOnInit(): void {
this.populateArray()
  }

  updateformModel(){
    this.updateForm=this.formbuilder.group({
      productName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      companyName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      description: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      category: new FormControl('',Validators.required),
      color: new FormControl('',Validators.required),
    })
  }

  populateArray(){
    this.service.getProductApi().subscribe((res:any)=>{
      res.result.forEach((element:any) => {
        if(element.SoftDeleteStatus !==1){
          this.product.push(element)
        }
      });
    })
  }
  // this get data in eye icon 
  getdata(_id:any){
    // this.makeidPublic=_id
    this.myId=_id
    // this.product=_id
     this.service.getProductByid(_id).subscribe((res:any)=>{
     this.particularProductData= res.result
     this.updateForm=this.formbuilder.group({
      productName: new FormControl(this.particularProductData.productName, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      companyName: new FormControl(this.particularProductData.companyName, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      quantity: new FormControl(this.particularProductData.quantity, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      price: new FormControl(this.particularProductData.price, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      description: new FormControl(this.particularProductData.description, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      category: new FormControl(this.particularProductData.category,Validators.required),
      color: new FormControl(this.particularProductData.color,Validators.required),
    })

     })
  }

  // this is soft delete 
  deleteParticular(_id:any){
    this.service.DeleteProductByidSoft(_id).subscribe((res:any)=>{
      this.toaster.error(res.message)
      this.product=[]
      this.populateArray()
    })

  }

hardDelete(_id:any){
  this.service.HardDelete(_id).subscribe((res:any)=>{
    this.toaster.error(res.message)
  })
}

updateSubmit(){
let payload=this.updateForm.value
payload['_id']=this.myId
this.service.UpdateById(payload).subscribe((res:any)=>{
  this.toaster.success(res.message)
  this.getdata(this.myId)
})
}
}
