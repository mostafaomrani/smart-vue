<template>
  <v-form v-model="valid">
    <v-alert v-if="message" type="success" :value="true" v-html="message"></v-alert>
    <v-layout row wrap>
      <v-flex sm6 lg6>
        <v-select
          @change="setorg($event)"
          :items="complex.orgitems"
          v-model="form.organizationId"
          :label="$t('organization.name')"
          auto
          v-validate="'required'"
          outlined
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>

      <v-flex sm6 lg6>
        <v-select
          :items="externalOrganization"
          v-model="form.externalorgId"
          :label="$t('externalorganization.name')"
          auto
          @change="changeexternalorg($event)"
          v-validate="'required'"
          outlined
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>
    </v-layout>
    <div>
      <v-flex sm6 lg12>
        <v-text-field
          :label="$t('client.clientname')"
          v-model="form.clientName"
          v-validate="'required'"
          data-vv-name="clientName"
          required
        ></v-text-field>
      </v-flex>

      <div class="form-btn">
        <v-btn outline @click="submit" color="primary">{{$t('general.save')}}</v-btn>
        <v-btn outline @click="clear">{{$t('general.reset')}}</v-btn>
      </div>
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
    isMobile: false,
    showAppType: false,
    showForm: false,
    complex: {
      appType: [],
      orgitems: [],
      projectitems: [],
    },
    message: "",
    saveCard: true,
    externalOrganization: [],
    valid: true,
    form: {
      appTypeId: "",
      organizationId: "",
      externalorgId: "",
      clientName: "",
      redirectUrl: "",
      logoutUrl: "",
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
      if (this.form.clientName == "") {
         Swal.fire(
          self.$t("general.error-subject"),
          self.$t("general.fill-field-message"),
          "error"
        );
      }

      getData(
        "post",
        "/api/Clients/external-organization",
        {
          externalOrganizationId: self.form.externalorgId,
          clientName: self.form.clientName,
        },
        {}
      ).then((response) => {
        if (response) {
          Swal.fire({
            title: "OAuth client created ! ",
            html:
              "You must keep the client secret. <br> Client id :  " +
              response.data.clientId +
              "<br> Client secret : " +
              response.data.clientSecret,
            icon: "info",
            width: "50%",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ok",
            cancelButtonText: "Reset",
          }).then((result) => {
            if (result.value) {
              window.location.href =
                "/" +
                self.$i18n.locale +
                "/forms/organization/external-client-list";
            }
          });
          self.complex.orgitems = res.data;
        }
      });
    },
    clear() {
      this.form = {};
      this.$validator.reset();
    },
    setorg(id) {
      var self = this;
      axios
        .get(baseUrl + "/api/Organizations/" + id + "/external-organizations", {
          headers: "",
        })
        .then(function (response) {
         console.log(response.data)
          self.externalOrganization = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeAppType() {
      this.showForm = true;
    },
    changeexternalorg() {
      this.showAppType = true;
    },
  },
};
</script>