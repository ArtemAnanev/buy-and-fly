import { HttpInterceptorFn } from '@angular/common/http';

import { contentTypeInterceptor } from './content-type.interceptor';

export const HttpInterceptors: HttpInterceptorFn[] = [contentTypeInterceptor];
