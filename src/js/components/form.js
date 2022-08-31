import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver
 } from 'vee-validate/dist/vee-validate.full';

$(function () {
  const hostUrl = window.location.host;
  const baseUrl = hostUrl.includes('localhost') ? 'http://localhost:3030/api' : 'https://digicraft-api-central.herokuapp.com/api';

  const inquiryForm = new Vue({
    el: "#inquiryForm",
    data: {
      formData: {
        subject: '',
        name: '',
        phoneNumber: '',
        email: '',
        description: '',
      },
      formStatus: '',
      generalSubmitError: '',
      recaptchaResponse: '',
      //   test: false,
    },
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    methods: {
      testFunction() {
        console.log("vue is here");
      },
      buttonSubmitted() {
        const btnSubmit = document.querySelector('#inquirySubmit');
        btnSubmit.setAttribute('disabled', true);
      },
      resetFormData() {
        this.formData = {
          subject: '',
          name: '',
          phoneNumber: '',
          email: '',
          description: '',
        }
      },
      async onSubmit() {
        this.generalSubmitError = '';
        this.buttonSubmitted();

        try {
          const response = await $.ajax({
            method: 'POST',
            url: `${baseUrl}/inquiry`,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(this.formData),
          }).promise();
          this.resetFormData();
          this.formStatus = 'completed';
        } catch (e) {
          this.formStatus = 'error';
          this.generalSubmitError = 'An error has occured while trying to submit the form. Please try again later.'
        } finally {
          this.$refs.inquiryForm.reset();
        }
      }
    },
    mounted() {
      this.testFunction();
    },
  });
});
