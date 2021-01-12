<template>
  <v-form v-model="valid">
    <v-alert v-if="message" type="success" :value="true" v-html="message"></v-alert>
    <v-layout row wrap>
      <v-flex sm6 lg6>
        <v-select
          @change="setorg"
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
          :items="users"
          v-model="form.users"
          :label="$t('organization.ownerName')"
          auto
          @change="changeUser"
          v-validate="'required'"
          outlined
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>

      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('organization.ownerFirstName')"
          v-model="form.firstname"
          v-validate="'required'"
          data-vv-name="firstname"
          :error-messages="$t('error.notEpty')"
          required
        ></v-text-field>
      </v-flex>

      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('organization.ownerLastName')"
          v-model="form.lastname"
          v-validate="'required'"
          data-vv-name="lastname"
          :error-messages="$t('error.notEpty')"
          required
        ></v-text-field>
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
      users: "",
      userId : "",
      firstname: "",
      lastname: "",
    },
    users: [
      {
        id: 1,
        name: "Alireza Momeni rokh",
      },
      {
        id: 2,
        name: "Amir Savari",
      },
      {
        id: 3,
        name: "Mostafa omrani",
      },
      {
        id: 4,
        name: "Morteza Rezaee",
      },
    ],
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
      if (this.form.firstname == "" || this.form.lastname == "") {
        Swal.fire(
          self.$t("general.error-subject"),
          self.$t("general.fill-field-message"),
          "error"
        );
        this.$validator.validateAll();
        return;
      }
      if (this.form.clientName == "") {
        Swal.fire(
          self.$t("general.error-subject"),
          self.$t("general.fill-field-message"),
          "error"
        );
      }

      getData(
        "post",
        "/api/Organizations/add-owner",
        {
          organizationId: this.form.organizationId,
          userId: this.form.userId.toString(),
          firstName: this.form.firstname,
          lastName: this.form.lastname,
        },
        {}
      ).then((response) => {
        if (response) {
          Swal.fire({
            title: this.$t("general.success-subject"),
            icon: "info",
            width: "50%",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: this.$t("general.ok"),
            cancelButtonText: this.$t("general.reset"),
          })
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
          console.log(response.data);
          self.externalOrganization = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeAppType() {
      this.showForm = true;
    },
    changeUser(userId) {
      this.form.userId = userId;
    },
  },
};
</script>