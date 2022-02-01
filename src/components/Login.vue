<template>
  <div>
    <section id="form">
      <!--form-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-sm-offset-1">
            <div class="login-form">
              <!--login form-->
              <form @submit.prevent="postLogin()" name="loginForm" id="loginId">
                <!-- <div class="text-danger" v-if="email != password">Email and Password Should be Matched.</div> -->
                <div
                  v-if="submitted1 && !$v.login.email.required"
                  class="invalid-feedback"
                >
                  Email is required.
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  v-model="login.email"
                  :class="{ 'is-invalid': submitted1 && $v.login.email.$error }"
                />
                <div
                  v-if="submitted1 && !$v.login.password.required"
                  class="invalid-feedback"
                >
                  password is required.
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  v-model="login.password"
                  :class="{
                    'is-invalid': submitted1 && $v.login.password.$error,
                  }"
                />
                <!-- <div v-if="submitted && !$v.user.passwordLogin.minLength" class="invalid-feedback">Minimum length is 5</div> -->
                <button type="submit" class="btn btn-default">Login</button>
                <facebook-login
                  class="button"
                  appId="326022817735322"
                  @login="onLogin"
                  @logout="onLogout"
                  @sdk-loaded="sdkLoaded"
                >
                </facebook-login>
                <GoogleLogin
                  :params="params"
                  :renderParams="renderParams"
                  :onSuccess="onSuccess"
                  :onFailure="onFailure"
                  >GoogleLogin</GoogleLogin
                >
              </form>
            </div>
            <!--/login form-->
          </div>
          <div class="col-sm-1">
            <h2 class="or">OR</h2>
          </div>
          <div class="col-sm-4">
            <div class="signup-form">
              <!--sign up form-->
              <h2>New User Signup!</h2>
              <form
                @submit.prevent="postRegister()"
                name="registrationForm"
                id="registrationId"
              >
                <div
                  v-if="submitted && !$v.register.first_name.required"
                  class="invalid-feedback"
                >
                  First Name is required.
                </div>
                <div
                  v-if="submitted && !$v.register.first_name.minLength"
                  class="invalid-feedback"
                >
                  First Name should be 3 character required.
                </div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  v-model="register.first_name"
                  :class="{
                    'is-invalid': submitted && $v.register.first_name.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.register.last_name.required"
                  class="invalid-feedback"
                >
                  last Name is required.
                </div>
                <div
                  v-if="submitted && !$v.register.last_name.minLength"
                  class="invalid-feedback"
                >
                  Last Name should be 3 character required.
                </div>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  v-model="register.last_name"
                  :class="{
                    'is-invalid': submitted && $v.register.last_name.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.register.email.required"
                  class="invalid-feedback"
                >
                  Email is required.
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  v-model="register.email"
                  :class="{
                    'is-invalid': submitted && $v.register.email.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.register.password.required"
                  class="invalid-feedback"
                >
                  password is required.
                </div>
                <div
                  v-if="submitted && !$v.register.password.minLength"
                  class="invalid-feedback"
                >
                  password should be atleast 5 character is required.
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  v-model="register.password"
                  :class="{
                    'is-invalid': submitted && $v.register.password.$error,
                  }"
                />
                <button type="submit" class="btn btn-default">Signup</button>
              </form>
            </div>
            <!--/sign up form-->
          </div>
        </div>
      </div>
    </section>
    <!--/form-->
  </div>
</template>
<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import facebookLogin from "facebook-login-vuejs";
import GoogleLogin from "vue-google-login";
import { userLogin } from "@/common/Service";
import { userRegister } from "@/common/Service";
import { saveToken } from "@/common/Jwttoken";
import store from "../store/store";
import * as type from "../store/type";
import { mapState } from "vuex";
export default {
  name: "Login",
  components: {
    facebookLogin,
    GoogleLogin,
  },
  data() {
    return {
      params: {
        client_id:
          "410203168694-irsqdrdm6o6980of46snoetn8rvss43k.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
      register: {
        first_name: null,
        msg: "User is Undefined",
        last_name: null,
        email: null,
        password: null,
      },
      login: {
        email: null,
        password: null,
      },
      submitted: false,
      submitted1: false,
    };
  },
  validations: {
    /* Validations For Register */
    register: {
      first_name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      last_name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      email: {
        required,
      },
      password: {
        required,
        minLength: minLength(5),
      },
    },

    /* Validations For Login */
    login: {
      email: { required },
      password: { required },
    },
  },
  computed: mapState({
    msg: (state) => state.opt,
    userid: (state) => state.emailId,
  }),
  methods: {
    /* Method For Login with Google */
    onSuccess(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
    /* Method for Login With FaceBook */
    getUserData() {
      this.FB.api(
        "/me",
        "GET",
        { fields: "id,password,email" },
        (userInformation) => {
          console.warn("data api", userInformation);
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.password = userInformation.password;
        }
      );
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    },

    /* Function For Login */
    postLogin() {
      this.submitted1 = true;
      this.$v.login.$touch();
      if (this.$v.login.$invalid) {
        return;
      }
      let formData = { email: this.login.email, password: this.login.password };
      userLogin(formData)
        .then((res) => {
          if (res) {
            saveToken(res.data.access_token);
            localStorage.setItem("uid", res.data.email);
            store.dispatch({
              type: type.Opt,
              id: res.data.access_token,
              userid: res.data.email,
            });
            this.$router.push("/");
          }
          if (res.data.err == 1) {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("Something Wrong " + err);
          alert("Incorrect credentials");
        });
    },

    /* Function For Register */
    postRegister() {
      this.submitted = true;
      this.$v.register.$touch();
      if (this.$v.register.$invalid) {
        return;
      }

      let registerData = {
        first_name: this.register.first_name,
        last_name: this.register.last_name,
        email: this.register.email,
        password: this.register.password,
        status: "active",
      };
      userRegister(registerData).then((res) => {
        if (res.data.email == "The email has already been taken.") {
          alert(res.data.email);
        } else {
          alert("successfully done");
          window.location.reload();
        }
      });
    },
  },
};
</script>

<style>
.invalid-feedback {
  color: red;
}
</style>