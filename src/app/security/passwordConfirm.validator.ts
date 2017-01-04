import { FormControl, AbstractControl } from '@angular/forms';

export class PasswordConfirmValidator {

    static equalsPassword(control: FormControl) {
        const passwordField = control.root.get("password")

        if(passwordField) {
            if(control.value !== passwordField.value) return {"the password confirmation does not match the password": true};
        }
        return null;
    }

}