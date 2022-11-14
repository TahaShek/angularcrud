import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Shared/Service/product.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
Url='http://localhost:1111/'
  constructor(private service:ProductService) { }
product:any=[]
  ngOnInit(): void {
  this.service.getProductApi().subscribe((res:any)=>{
this.product=res.result
  })
  }
}
