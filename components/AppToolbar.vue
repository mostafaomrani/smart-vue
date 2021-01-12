<template>
  <v-toolbar color="primary" fixed dark app>
    <v-toolbar-title class="ml-0">
      <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
    </v-toolbar-title>
    <!-- <v-text-field
      flat
      solo-inverted
      prepend-icon="search"
      label="جستجو"
      class="hidden-sm-and-down text-aglign-right"
    ></v-text-field>-->

    

    <v-spacer></v-spacer>
    <v-btn>{{$t('home.welcome')}}  - مصطفی عمرانی </v-btn>
    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <v-menu
      offset-y
      origin="center center"
      class="elelvation-1"
      transition="scale-transition"
    >
      <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">0</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
      </v-btn>
      <notification-list>
        a
      </notification-list>
    </v-menu>
    <v-menu
      offset-y
      origin="center center"
      :nudge-right="140"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px">
          <img src="../static/avatar/man_4.jpg" alt="Michael Wang" />
        </v-avatar>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item,index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="index"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import NotificationList from "@/components/widgets/list/NotificationList";
import Util from "@/util";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app-toolbar",
  components: {
    NotificationList,
  },
  data: function () {
    return {
      roles: [],
      rolesdata: "",
      user: null,
      items: [
        {
          icon: "account_circle",
          href: "#",
          title: this.$t('general.account'),
          click: (e) => {
            console.log(e);
          },
        },
        {
          icon: "settings",
          href: "#",
          title: this.$t('general.setting'),
          click: (e) => {
            console.log(e);
          },
        },
        {
          icon: "fullscreen_exit",
          href: "#",
          title: this.$t('general.logout'),
          click: this.signOutOidc,
        },
      ],
    };
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    },
  },
  mounted() {
    this.roles = [
      {
        country: "مدیر",
        abbr: "0",
      },
      {
        country: "کاربر سیستم",
        abbr: "1",
      },
      {
        country: "مهمان",
        abbr: "2",
      },
    ];
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.user = "ALI";
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  },
  methods: {
    ...mapActions("oidc",[
      'signOutOidc'
    ]),

    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    handleLogout() {
      this.$router.push("/login");
      
    },
  },
};
</script>

<style  scoped>
.text-aglign-right::placeholder {
  text-align: right;
}
</style>