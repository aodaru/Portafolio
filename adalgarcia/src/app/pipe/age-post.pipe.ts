import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'agePost'
})
export class AgePostPipe implements PipeTransform {

  transform(value: string) {
    let html:string = "";
    let today = moment();
    let birthday = moment(value);
    let years = today.diff(birthday, 'years');
    let months = today.subtract(years, 'years').diff(birthday, 'months');
    let days = today.subtract(years, 'years').diff(birthday, 'days');
    let hours = today.subtract(years, 'years').diff(birthday, 'hours');
    if (years == 0){
      if (months == 0) {
        console.log(days);
        if (days == 0){
          html = "Creado hace " + hours +" horas";
        }else{
          html = "Creado hace " + days +" días";
        }
      }else{
        html = "Creado hace " + months + " meses";
      }
    }else{
        html = "Creado hace " + years + " años";
    }

    return html;
  }

}
