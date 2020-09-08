export class DateFormatService {

  static getDate(date: Date): string {
    return `${date.toDateString()} at ${DateFormatService.offset(date.getHours())}:${DateFormatService.offset(date.getMinutes())}:${DateFormatService.offset(date.getSeconds())}`;
  }

  static offset(value: number): string  {
    return value < 10 ? `0${value}`: `${value}`;
  }
}
