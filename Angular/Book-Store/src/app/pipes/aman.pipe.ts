import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aman'
})

export class AmanPipe implements PipeTransform {
  transform(item, ...args) {
    let arr = [];
    for (let it in item) {
      let obj = {};
      obj[it] = item[it]
      arr.push(obj);
    }
    return arr;
  }
}
