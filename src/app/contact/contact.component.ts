import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    message: '',
  };

  onSubmit(){
    console.log('Form Data', this.formData);
    alert('Form has been submitted successfully!');
  }
}
