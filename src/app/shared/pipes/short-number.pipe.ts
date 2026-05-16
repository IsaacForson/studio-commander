import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber',
  standalone: true,
})
export class ShortNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';
    const abs = Math.abs(value);
    if (abs < 1000) return value.toString();
    const sign = value < 0 ? '-' : '';
    const shortened = abs / 1000;
    const formatted = shortened % 1 === 0 ? shortened.toFixed(0) : shortened.toFixed(1);
    return `${sign}${formatted}k`;
  }
}
