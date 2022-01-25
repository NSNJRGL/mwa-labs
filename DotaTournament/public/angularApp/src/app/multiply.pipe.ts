import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiply',
})
export class MultiplyPipe implements PipeTransform {
  transform(value: number, ...args: number[]): number {
    let result: number = 1;
    args.forEach((arg) => (result = value * arg));

    return result;
  }
}
