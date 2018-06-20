import gql from 'graphql-tag';
import { ContentfulService } from './core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { get, join } from 'lodash';
import * as qs from 'qs';
import { Title } from '@angular/platform-browser';

@Injectable()
export class ContentResolve implements Resolve<any> {
  constructor(private contentful: ContentfulService,
    private title: Title) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    const slug = join(route.url, '/'),
      params = { 'fields.slug': slug || 'frontpage', limit: 1 };
    const response = await this.contentful.query<any>({
      query: gql`
        {
          pages(q: "${qs.stringify(params)}") {
            slug
            title
            isFrontpage
            tags{
              title
            }
            featuredImage{
              title
              url
            }
            contentBlocks{
              ... on BlockPageHeader {
                title
                callToAction {
                  ... on CallToAction {
                    title
                    url
                    linkLabel
                    page {
                      slug
                      title
                    }
                  }
                }
              }
              ... on BlockZipper {
                title
                topics {
                  title
                  content
                  image{
                    title
                    url
                  }
                  icon
                  learnMoreLink
                  linkToPage {
                    slug
                    title
                  }
                }
              }
              ... on BlockMarkdown {
                title
                body
                featuredImage{
                  title
                  url
                }
              }
              ... on BlockSchedule {
                scheduleSource
                tag
              }
              ... on BlockCollapse {
                title
                content
              }
              ... on BlockSection {
                title
                items{
                  ... on BlockMarkdown {
                    title
                    body
                    featuredImage{
                      title
                      url
                    }
                  }
                }
                featuredImage{
                  title
                  url
                }
              }
              ... on BlockSponsors {
                title
              }
              ... on BlockNews {
                title
                filterByCategory
                frontpageFeaturedNewsOnly
              }
            }
          }
        }`
    });
    const page = get(response, 'data.pages[0]');
    if (page) {
      this.title.setTitle(page.title + ' - ' + this.contentful.getEvent().eventTitle);
    }
    return page;
  }
}
