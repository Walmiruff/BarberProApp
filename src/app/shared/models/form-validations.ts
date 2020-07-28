import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FormValidations {



    static getErrorMsgEN(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} is required.`,
            'minlength': `${fieldName} must have at least ${validatorValue.requiredLength} digits.`,
            'maxlength': `${fieldName} should be at most ${validatorValue.requiredLength} digits.`,
            'email': `Invalid ${fieldName}`,

        };

        return config[validatorName];

    }


    static getErrorMsgPT(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} é necessário.`,
            'minlength': `${fieldName} deve ter pelo menos ${validatorValue.requiredLength} dígitos.`,
            'maxlength': `${fieldName} deve ser no máximo ${validatorValue.requiredLength} dígitos.`,
            'email': `Inválido ${fieldName}`,

        };

        return config[validatorName];

    }



    static getErrorMsgDE(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} wird benötigt.`,
            'minlength': `${fieldName} muss mindestens haben ${validatorValue.requiredLength} ziffern.`,
            'maxlength': `${fieldName} sollte höchstens sein ${validatorValue.requiredLength} ziffern.`,
            'email': `Ungültig ${fieldName}`,

        };

        return config[validatorName];

    }


    static getErrorMsgES(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} es requerido.`,
            'minlength': `${fieldName} debe tener al menos ${validatorValue.requiredLength} dígitos.`,
            'maxlength': `${fieldName} debería ser a lo sumo ${validatorValue.requiredLength} dígitos.`,
            'email': `Inválido ${fieldName}`,

        };

        return config[validatorName];

    }


    static getErrorMsgFR(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} est requis.`,
            'minlength': `${fieldName} doit avoir au moins ${validatorValue.requiredLength} chiffres.`,
            'maxlength': `${fieldName} devrait être au plus ${validatorValue.requiredLength} chiffres.`,
            'email': `Invalide ${fieldName}`,

        };

        return config[validatorName];

    }


    static getErrorMsgIT(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} è obbligatorio.`,
            'minlength': `${fieldName} deve avere almeno ${validatorValue.requiredLength} cifre.`,
            'maxlength': `${fieldName} dovrebbe essere al massimo ${validatorValue.requiredLength} cifre.`,
            'email': `Non valido ${fieldName}`,

        };

        return config[validatorName];

    }

}









