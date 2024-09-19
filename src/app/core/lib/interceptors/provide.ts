import { contentTypeInterceptor } from './content-type.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';

export const HttpInterceptors: HttpInterceptorFn[] = [contentTypeInterceptor];
