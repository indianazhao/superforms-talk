import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

export abstract class R3FormlyFieldConfig {
  key: string;
  label: string;
  formlyConfig?: FormlyFieldConfig;
}

export abstract class FormlyDataControlConfig extends R3FormlyFieldConfig {
  data?: Observable<any> | any[];
  multiple?: false;
}

@Injectable({
  providedIn: 'root'
})
export class FormlyService {
  constructor() {}

  input(config: R3FormlyFieldConfig): FormlyFieldConfig {
    let formlyFieldDef: FormlyFieldConfig = {
      key: config.key,
      type: 'input',
      templateOptions: {
        label: config.label
      }
    };

    formlyFieldDef = this.mergeWithFormlyConfig(formlyFieldDef, config);

    return formlyFieldDef;
  }

  number(config: R3FormlyFieldConfig): FormlyFieldConfig {
    const formlyFieldDef: FormlyFieldConfig = {
      templateOptions: {
        type: 'number'
      }
    };

    if (config.formlyConfig) {
      if (config.formlyConfig.templateOptions) {
        config.formlyConfig.templateOptions = {
          ...formlyFieldDef.templateOptions,
          ...config.formlyConfig.templateOptions
        };
      } else {
        config.formlyConfig.templateOptions = formlyFieldDef.templateOptions;
      }
    } else {
      config.formlyConfig = formlyFieldDef;
    }

    return this.input(config);
  }

  textarea(config: R3FormlyFieldConfig): FormlyFieldConfig {
    let formlyFieldDef: FormlyFieldConfig = {
      key: config.key,
      type: 'textarea',
      templateOptions: {
        label: config.label,
        rows: 5
      }
    };

    formlyFieldDef = this.mergeWithFormlyConfig(formlyFieldDef, config);

    return formlyFieldDef;
  }

  date(config: R3FormlyFieldConfig): FormlyFieldConfig {
    let formlyFieldDef: FormlyFieldConfig = {
      key: config.key,
      type: 'input',
      templateOptions: {
        label: config.label,
        type: 'date'
      }
    };

    formlyFieldDef = this.mergeWithFormlyConfig(formlyFieldDef, config);

    return formlyFieldDef;
  }

  datepicker(config: R3FormlyFieldConfig): FormlyFieldConfig {
    const formlyfieldDef = this.date(config);
    formlyfieldDef.templateOptions.type = 'input';

    return formlyfieldDef;
  }

  select(config: FormlyDataControlConfig): FormlyFieldConfig {
    let formlyFieldDef: FormlyFieldConfig = {
      key: config.key,
      type: 'select',
      templateOptions: {
        label: config.label,
        options: (config.data || []) as any,
        multiple: config.multiple
      }
    };

    formlyFieldDef = this.mergeWithFormlyConfig(formlyFieldDef, config);

    return formlyFieldDef;
  }

  private mergeWithFormlyConfig(formlyFieldDef, config) {
    // TODO(JS): find a more intelligent way of doing this stuff 😓
    if (config.formlyConfig) {
      if (config.formlyConfig.templateOptions) {
        formlyFieldDef.templateOptions = {
          ...formlyFieldDef.templateOptions,
          ...config.formlyConfig.templateOptions
        };
        delete config.formlyConfig.templateOptions;
      }

      formlyFieldDef = { ...formlyFieldDef, ...config.formlyConfig };
    }

    return formlyFieldDef;
  }
}
