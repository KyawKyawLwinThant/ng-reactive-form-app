import {FormControl} from '@angular/forms';


export function validateAge(ctrl:FormControl) {
      const ageValue = parseInt(ctrl.value);
      const validAge = ageValue && ( ageValue >= 18 && ageValue <=50);
      return validAge?null :{
        validateAge:{
          valid:false
        }
      }
}
