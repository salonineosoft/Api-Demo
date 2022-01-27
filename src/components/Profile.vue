<template>
  <div class="container text-center">
    <div class="card">
      <img src="images/home/orng.jpg" width="60px" alt="" />
      <div class="card-body">
        <h1 class="card-title">My Profile</h1>
        <hr />
        <h4 class="card-text">
          First Name:-<b>{{ first_name }}</b>
        </h4>
        <h4 class="card-text">
          Last Name:-<b>{{ last_name }}</b>
        </h4>
        <h4 class="card-link">
          Email:-<b>{{ email }}</b>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { profile } from "@/common/Service";
export default {
  name: "Profile",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
    };
  },
  mounted() {
    profile()
      .then((res) => {
        this.first_name = res.data.profile.first_name;
        this.last_name = res.data.profile.last_name;
        this.email = res.data.profile.email;
        console.log(res.data.profile);
      })
      .catch((error) => {
        console.log("Something Wrong " + error);
      });
  },
};
</script>

<style>
h1 {
  text-align: center;
  color: orange;
}
.container {
  margin-bottom: 30px;
}
b {
  color: orange;
  text-indent: 11px;
}
</style>