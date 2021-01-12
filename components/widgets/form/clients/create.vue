<template>
  <v-form v-model="valid">
    <v-alert v-if="message" type="success" :value="true" v-html="message"></v-alert>
    <v-layout row wrap>
      <v-flex sm6 lg6>
        <v-select
          @change="setorg"
          :items="complex.orgitems"
          v-model="form.organizationId"
          :label="$t('organization.title')"
          auto
          v-validate="'required'"
          outlined
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>

      <v-flex sm6 lg6>
        <v-select
          :items="projects"
          v-model="form.projectId"
          :label="$t('project.title')"
          auto
          @change="changeproject"
          v-validate="'required'"
          outlined
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>

      <v-flex sm6 lg6>
        <v-select
          @change="changeAppType"
          :items="complex.appType"
          v-model="form.apptype"
          label="Client Type"
          auto
          v-validate="'required'"
          outlined
          item-text="name"
          item-value="id"
          single-line
        ></v-select>
      </v-flex>

      <v-flex sm6 lg6>
        <v-text-field
          label="Client name"
          v-model="form.clientname"
          v-validate="'required'"
          data-vv-name="permisionName"
          required
        ></v-text-field>
      </v-flex>

      <v-flex sm6 lg6>
        <v-select
          :items="form.redirecturl"
          v-model="redirectUris"
          tags
          chips
          multiple
          label="Redirect Uris"
          class="input-group--focused"
          item-text="country"
        ></v-select>
      </v-flex>

      <v-flex sm6 lg6>
        <v-select
          :items="form.logouturl"
          v-model="logoutRedirectUris"
          tags
          chips
          multiple
          label="LogoutRedirect Uris"
          class="input-group--focused"
          item-text="country"
        ></v-select>
      </v-flex>
    </v-layout>
    <div class="form-btn">
      <v-btn outline @click="submit" color="primary">{{$t('general.save')}}</v-btn>
      <v-btn outline @click="clear">{{$t('general.reset')}}</v-btn>
    </div>
  </v-form>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import directory from "@/api/directory";
import { baseUrl, lang } from "@/store";
import getData from "@/store/axios";

export default {
  data: () => ({
    redirectUris: [],
    logoutRedirectUris: [],
    mostadfaom: null,
    isMobile: false,
    showresource: false,
    showForm: false,
    complex: {
      resource: [],
      orgitems: [],
      projectitems: [],
    },
    message: "",
    saveCard: true,
    projects: [],
    valid: true,
    form: {
      clientname: null,
      resourceId: null,
      organizationId: "",
      projectId: "",
      permisionName: "",
      permisionTitle: "",
      description: "",
      redirectUrl: "",
      logoutUrl: "",
      apptype: "",
    },
  }),
  mounted() {
    this.$validator.localize("fa", lang);
    var self = this;
    this.$nextTick(() => {
      self.$nuxt.$loading.start();
      getData("get", "/api/Clients/types", {}, {}).then((res) => {
        self.complex.appType = res.data;
      });
      getData("get", "/api/Organizations", {}, {}).then((res) => {
        self.complex.orgitems = res.data;
      });
      setTimeout(() => self.$nuxt.$loading.finish(), 500);
    });
  },
  methods: {
    submit() {
      var self = this;
      if (
        this.redirectUris == "" ||
        this.form.clientname == "" ||
        this.logoutRedirectUris == ""
      ) {
        Swal.fire(self.$t("general.error-subject"),self.$t("general.fill-field-message"), "error");
        this.$validator.validateAll();
        return;
      } else {
        if (this.form.apptype == 1) {
          getData(
            "post",
            "/api/Clients/server-side",
            {
              projectId: this.form.projectId,
              clientName: this.form.clientname,
              redirectUris: this.redirectUris,
              logoutRedirectUris: this.logoutRedirectUris,
            },
            {}
          ).then((res) => {
            Swal.fire({
              title: "OAuth client created ! ",
              html:
                "You must keep the client secret. <br> Client id :  " +
                res.data.clientId +
                "<br> Client secret : " +
                res.data.clientSecret,
              icon: "info",
              width: "50%",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
              cancelButtonText: "Reset",
            }).then((result) => {
              if (result.value) {
                window.location.href =
                  "/" + self.$i18n.locale + "/forms/clients/list";
              }
            });
          });
        } else if (this.form.apptype == 2) {
          getData(
            "post",
            "/api/Clients/client-side",
            {
              projectId: this.form.projectId,
              clientName: this.form.clientname,
              redirectUris: this.redirectUris,
              logoutRedirectUris: this.logoutRedirectUris,
            },
            {}
          ).then((res) => {
            Swal.fire({
              title: "Success ! ",
              icon: "info",
              width: "50%",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok ...",
              cancelButtonText: "Reset",
            }).then((result) => {
              if (result.value) {
                window.location.href =
                  "/" + self.$i18n.locale + "/forms/clients/list";
              }
            });
          });
        } else {
          getData(
            "post",
            "/api/Clients/mobile",
            {
              projectId: this.form.projectId,
              clientName: this.form.clientname,
              redirectUris: this.redirectUris,
              logoutRedirectUris: this.logoutRedirectUris,
            },
            {}
          ).then((res) => {
            Swal.fire({
              title: "Success ! ",
              icon: "info",
              width: "50%",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok ...",
              cancelButtonText: "Reset",
            }).then((result) => {
              if (result.value) {
                window.location.href =
                  "/" + self.$i18n.locale + "/forms/clients/list";
              }
            });
          });
        }
      }
    },
    clear() {
      this.form = {};
      this.$validator.reset();
    },
    setorg(orgId) {
      var self = this;
      getData("get", "/api/Projects/" + orgId, {}, {}).then((res) => {
        self.projects = res.data;
      });
    },
    changeResource(resourceId) {
      this.form.resourceId = resourceId;
      this.showForm = true;
    },
    changeproject(projectId) {
      getData("get", "/api/Resources/" + projectId + "/resource", {}, {}).then(
        (res) => {
          this.complex.resource = res.data;
        }
      );
      this.form.projectId = projectId;
    },
    changeAppType(id) {
      this.isMobile = true;
    },
  },
};
</script>