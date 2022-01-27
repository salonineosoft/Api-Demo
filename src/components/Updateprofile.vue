<template>
  <div class="" id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <b><h2 class="head text-center text-danger">Update Profile</h2></b>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="first_name">First Name</label>
                <input
                  type="text"
                  v-model="user.first_name"
                  id="first_name"
                  name="first_name"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.first_name.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.first_name.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.first_name.required"
                    >First Name is required</span
                  >
                  <span v-if="!$v.user.first_name.alpha"
                    >First Name should contains only letters</span
                  >
                  <span v-if="!$v.user.first_name.minLength"
                    >First Name minimum legth should be atleast 2</span
                  >
                  <span v-if="!$v.user.first_name.maxLength"
                    >First Name maximum length should not be more than 10</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="last_name">Last Name</label>
                <input
                  type="text"
                  v-model="user.last_name"
                  id="last_name"
                  name="last_name"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.last_name.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.last_name.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.last_name.required"
                    >Last Name is required</span
                  >
                  <span v-if="!$v.user.last_name.alpha"
                    >Last Name should contains only letters</span
                  >
                  <span v-if="!$v.user.last_name.minLength"
                    >Last Name minimum legth should be atleast 2</span
                  >
                  <span v-if="!$v.user.last_name.maxLength"
                    >Last Name maximum length should not be more than 10</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email is required</span>
                  <span v-if="!$v.user.email.email">Email is invalid</span>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Update Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  alpha,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { profile } from "@/common/Service";
import { profiledit } from "@/common/Service";
export default {
  name: "Updateprofile",

  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      first_name: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(50),
      },
      last_name: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(50),
      },
      email: { required, email },
    },
  },
  mounted() {
    profile()
      .then((res) => {
        this.user.first_name = res.data.profile.first_name;
        this.user.last_name = res.data.profile.last_name;
        this.user.email = res.data.profile.email;
        console.log(res.data.profile);
      })
      .catch((error) => {
        console.log("Something Wrong " + error);
      });
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      let formData = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
      };

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
      console.log(formData);
      profiledit(formData)
        .then((res) => {
          console.log(this.formData);
          console.log(res.data);
          this.$router.push("/profile");
        })
        .catch((error) => {
          console.log("Something Wrong " + error);
        });
    },
  },
};
</script>
 
<style>
b {
  color: orange;
}
</style>