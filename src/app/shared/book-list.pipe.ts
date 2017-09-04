

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:'limitFor'})
export class LimitForPipe implements PipeTransform {
    transform(value: any, length: number) {
        if (value.length > length) {
            return value.slice(0, length);
        }
        return value;
    }
}

@Pipe({name:'limitString'})
export class LimitStringPipe implements PipeTransform {
    transform(value: any, length: number) {
        if (value.length > length) {
            return value.substr(0, length) + '...';
        }
        return value;
    }
}
