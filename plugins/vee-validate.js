import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from "vee-validate"
import { required, email, min, confirmed } from 'vee-validate/dist/rules'

extend('required', {
    ...required,
    message: 'This field is required'
})
extend('email', email)
extend('min', {
  ...min,
  message: 'Password length must be at least 4 characters'
})
extend('confirmed', confirmed)
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
