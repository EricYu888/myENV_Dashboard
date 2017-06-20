import { Injectable } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class Notify {

  private isInjected: boolean = false;
  constructor(public toastr: ToastsManager) { }

  public setRootContext(vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
    this.isInjected = true;
  }

  public error(message: string, title?: string, options?: any): Promise<Toast> {
    this.filter();
    return this.toastr.error(message, title, options);
  }
  public info(message: string, title?: string, options?: any): Promise<Toast> {
    this.filter();
    return this.toastr.info(message, title, options);
  }

  public success(message: string, title?: string, options?: any): Promise<Toast> {
    this.filter();
    return this.toastr.success(message, title, options);
  }

  public warning(message: string, title?: string, options?: any): Promise<Toast> {
    this.filter();
    return this.toastr.warning(message, title, options);
  }
  public custom(message: string, title?: string, options?: any): Promise<Toast> {
    this.filter();
    return this.toastr.custom(message, title, options);
  }

  private filter(): void {
    if (!this.isInjected) {
      throw new Error("inject ViewContainerRef first, please use setRootContext method");
    }
  }


}
