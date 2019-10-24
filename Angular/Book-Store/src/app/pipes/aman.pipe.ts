import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aman'
})

export class AmanPipe implements PipeTransform {
  set;

  transform(item, args?) {

    if (!args) {
      return item;
    } else {
      this.set = new Set();
      item.forEach(it => {
        delete it._id;
        delete it.create_date;
        Object.values(it).forEach(val => {
          if (val.toString().toLowerCase().includes(args.toLowerCase())) {
            this.set.add(it);
          }
        })
      });
      return [...this.set];
    }
  }
}
// TODO filter from database
