import { Pipe, PipeTransform } from '@angular/core';
import fm from 'front-matter';

@Pipe({
  name: 'frontMatter'
})
export class FrontMatterPipe implements PipeTransform {

  transform(value: string, option: string): string {
    let data:any = fm(value);

    switch(option) {
      case 'title':{
        return data.attributes.title;
      }
      case 'description': {
        return data.attributes.description;
      }
      case 'tags': {
        return data.attributes.tags;
      }
      case 'body': {
        return data.body;
      }
      default: {
        return data;
      }
    }
  }

}
