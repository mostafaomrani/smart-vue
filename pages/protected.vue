<template>
  <div v-if="oidcIsAuthenticated" class="protected">
    <div
      style="width:100%;max-width:640px;height: 200px;margin: 0 auto;font-family: monospace;"
      v-html="user"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters("oidc", ["oidcIsAuthenticated", "oidcUser"]),
    userDisplay: function () {
      return jsonMarkup(this.oidcUser);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      console.log(this.oidcUser);
      this.user = this.oidcUser.name ;
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
};
</script>
