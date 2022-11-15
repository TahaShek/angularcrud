import { Component, OnInit } from '@angular/core';
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
Url='http://localhost:1111/'

  constructor(private service:ProductService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.service.getProductApi().subscribe((res:any)=>{
      res.result.forEach((element:any) => {
        if(element.SoftDeleteStatus !==1){
          this.product.push(element)
        }
      });
    })
  }
  getdata(_id:any){
     this.service.getProductByid(_id).subscribe((res:any)=>{
     this.particularProductData= res.result

     })
  }

  deleteParticular(_id:any){
    this.service.DeleteProductByidSoft(_id).subscribe((res:any)=>{
      this.toaster.error(res.message)
      this.product=[]
      this.ngOnInit()
    })

  }

}
