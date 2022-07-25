import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  'name': 'concat'
})

export class ConcatPipe implements PipeTransform {
  transform(value: {firstName:string, lastname:string}): string {
      return `${value.lastname.toUpperCase()}  ${value.firstName}`;
  }
}
