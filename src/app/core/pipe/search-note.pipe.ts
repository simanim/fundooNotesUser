import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchNote'
})
export class SearchNotePipe implements PipeTransform {
  transform(value: any, args?: any): any {

    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(function(item){
      return (JSON.stringify(item.title).toLowerCase().includes(args) || JSON.stringify(item.description).toLowerCase().includes(args));
    });
}

}
