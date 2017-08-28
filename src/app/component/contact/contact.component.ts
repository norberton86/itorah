import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  description: string = "Please be as specific as possible, and make sure to copy and paste any errors, and make sure to include the shiur code #, and title."
  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.InitializeForm();
  }

  InitializeForm() {
    let EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    var data = {
      issue: '2',
      name: '',
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      phone: '',
      city: '',
      state: '----------------------------------',
      country: 'USA',
      subject: '',
      body: ['', Validators.required]
    }

    this.form = this.fb.group(data);
  }

  ngOnInit() {
  }

  filterChanged(value: string) {
    if (value == "2")
      this.description = "Please be as specific as possible, and make sure to copy and paste any errors, and make sure to include the shiur code #, and title."
    else if (value == "3")
      this.description = "Please make sure to specify the Shiur code, and the minute/second where the issue occurs."
    else if (value == "4")
      this.description = "(Unfortunately, we can not accept Halachic questions for the Rabbi)"
    else
      this.description = " "
  }

  countryChanged(value: string) {
    if (value != "USA")
      this.form.patchValue({ state: '----------------------------------' });
  }

  Send() {
    let self = this
    this.contactService.Send(this.form.value).subscribe(
      function (respond) {
        self.contactService.Notify("Message sent", false)
        self.form.patchValue({
          issue: '2',
          name: '',
          email: '',
          phone: '',
          city: '',
          state: '----------------------------------',
          country: 'USA',
          subject: '',
          body: ''
        })
      },
      function (error) {
        self.contactService.Notify("Service not available", true)
      },
      function () { }
    )

  }
}
