import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/contentful.service';

@Component({
  selector: 'asm-block-zipper-content',
  templateUrl: './block-zipper-content.component.html',
  styleUrls: ['./block-zipper-content.component.scss']
})
export class BlockZipperContentComponent implements OnInit {
  content: any = {};
  image: string;
  link: string;
  icon: string;

  static blockName = 'BlockZipperContent';

  constructor(private contentful: ContentfulService) {}

  ngOnInit() {
    this.image = this.getImage() || '';
    this.link = this.getLink();
    this.icon = this.getIcon();
  }

  getIcon() {
    if (this.content && this.content.icon) {
      return this.content.icon;
    } else {
      return 'angle-double-right';
    }
  }

  getImage() {
    if (this.content && this.content.image) {
      return 'url(' + this.content.image.url + ')';
    } else
     return 'url(\'/assets/images/assembly-generic-image-1.jpg\')';
  }

  getLink() {
    if (this.content) {
      if (this.content.linkToPage) {
        return `/${this.contentful.getEvent().name}/${this.content.linkToPage.slug}`;
      }
      if (this.content.learnMoreLink) {
        return this.content.learnMoreLink;
      }
    }
    return '';
  }
}
