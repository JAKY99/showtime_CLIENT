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
    console.log(formType);
    this.ref.detectChanges();
  }
  public changeFormType(): void {
    console.log(this.formType);
    this.formType =this.formType==="login" ? "reset" : "login";
  }

}
