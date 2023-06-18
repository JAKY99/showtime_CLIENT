import {Component, OnInit, ViewEncapsulation,ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginPageComponent implements OnInit {
  public formType: string = "reset";
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngOnChanges(formType : string): void {
    this.ref.detectChanges();
  }
  public changeFormType(): void {
    this.formType =this.formType==="login" ? "reset" : "login";
  }

}
