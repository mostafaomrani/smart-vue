<template>
  <div>{{$route.params.id}}</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  validate({ params }) {
    if (params.id == 11 && params) return /^\d+$/.test(params.id);
  },
  data() {
    return {
      paramId: 1,
    };
  },
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
    console.log(this.$store);
    console.log(this.$route.params.id);
  },
};
</script>