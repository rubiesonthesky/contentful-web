import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asm-block-collapse',
  templateUrl: './block-collapse.component.html',
  styleUrls: ['./block-collapse.component.scss']
})
export class BlockCollapseComponent implements OnInit{
  content: any = {};
  ngOnInit() {
    console.log(this);
    console.log(this.content.title);
  }
}