import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { DebugComponent } from '../../shared/debug/debug.component';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html'
})
export class HeroFormComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  hero = {
    name: 'ngWizard',
    realName: 'Maxim Koretskyi',
    superpower: 'Really Smart'
  };

  @ViewChild(DebugComponent) debugCmp: DebugComponent;

  constructor() {}

  ngOnInit() {}

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.debugCmp.displaySubmit(form.value);
    } else {
      alert('Form not valid');
    }
  }
}
