import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate';


const dictionary = {
    en: {
        organizationName: {
            required: "نام پروژه خالی می باشد.",
        }
    },
    ar: {
        organizationName: {
            required: "Your organization name is empty",
        }
    }
  };
  
  Validator.localize('ar'); // changes the locale
  
Vue.use(VeeValidate);
