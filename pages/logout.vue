<template>
  <div v-if="user">
    خوش آمدید {{ user }}
    <br />
    <button @click="signOutOidc">Sign out</button>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import jsonMarkup from "json-markup";
import SignedInUser from "@/components/SignedInUser";

export default {
  name: "Protected",
  loading: {
    color: "red",
    height: "10px",
  },
  data: () => ({
    user: null,
  }),
  components: { SignedInUser },
  computed: {
    ...mapGetters("oidc", [
      "oidcIsAuthenticated",
      "oidcAuthenticationIsChecked",
      "oidcUser",
      "oidcIdToken",
      "oidcIdTokenExp",
    ]),
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      console.log(this.oidcUser);
      this.user = this.oidcUser.name;
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
   methods: {
    ...mapActions("oidc",[
      'signOutOidc'
    ])
  }
};
</script>
