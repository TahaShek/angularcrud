import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Shared/Service/product.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  categories=['jeans','hoddies']
  color=['red','green','black']
  selectSize=['s','m','l']
  newsizeArray:any=[]
  newimageArray:any=[]
  hello:boolean=false;
  formGroup:FormGroup|any
  @ViewChild ('FileSelect') FileSelect:ElementRef|any
  // @ViewChild ('select') select:ElementRef|any

  @ViewChildren("checkboxes") checkboxes:ElementRef|any


  constructor(private toastr: ToastrService,private formbuidler:FormBuilder,private productservice:ProductService) {
    this.formodel()
   }
  ngOnInit(): void {
    
  }
uncheckAll(){
  this.checkboxes.forEach((element:any) => {
    element.nativeElement.checked = false;
    
    
  });

}

  formodel(){
    this.formGroup=this.formbuidler.group({
      productName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      companyName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      description: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      category: new FormControl('',Validators.required),
      color: new FormControl('',Validators.required),
      size: new FormArray([]),
     
    })
  }


  
 getsize(event:any){
  if(event.target.checked){
    this.newsizeArray.push(event.target.value)
  }
  else{
    this.newsizeArray=this.newsizeArray.filter((element:any)=>element !=event.target.value

    )
  }
 }

 getimage(event:any){
let filesLenght=event.target.files.length
if(event.target.files.length<=5){
  [...event.target.files].forEach((file)=>this.newimageArray.push(file)
  )
}
else{
  this.newimageArray=[]
this.FileSelect.nativeElement.value=null
this.toastr.error(`Image selection limit is 5 but you have selected ${filesLenght}`)
}
 }


  submitProductForm(){
    // this.newsizeArray.forEach((elements: string) => {
    //   let formControl = new FormControl(elements);
    //   this.formGroup.get("size").push(formControl);
    // })
    this.newsizeArray.forEach((element:string) => {
      let formControl= new FormControl(element)
      this.formGroup.get("size").push(formControl)
    });
let MultiPartFormData=new FormData()
MultiPartFormData.append("productName",this.formGroup.get("productName").value) 
MultiPartFormData.append("companyName",this.formGroup.get("companyName").value) 
MultiPartFormData.append("quantity",this.formGroup.get("quantity").value) 
MultiPartFormData.append("price",this.formGroup.get("price").value) 
MultiPartFormData.append("description",this.formGroup.get("description").value) 
// MultiPartFormData.append(" description",this.formGroup.get(" description").value) 
// MultiPartFormData.append(" color",this.formGroup.get("color").value) 
 
MultiPartFormData.append("category",this.formGroup.get("category").value) 
MultiPartFormData.append("color",this.formGroup.get("color").value) 
MultiPartFormData.append("size",this.formGroup.get("size").value) 
// MultiPartFormData.append("productMaterial",this.formGroup.get("productMaterial").value) 

this.newimageArray.forEach((ImagesData:any) => {
  MultiPartFormData.append("images",ImagesData)
});



this.productservice.createApi(MultiPartFormData).subscribe((response:any)=>{
  this.toastr.success(response.message)
  this.formGroup.reset()
  this.FileSelect.nativeElement.value =null
  this.uncheckAll()

  
  
})

}



}
