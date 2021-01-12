<template>
  <v-form v-model="valid">
    <v-alert v-if="message" type="success" :value="true">{{message}}</v-alert>

    <div class="d-flex my-2">
      <v-select
        :items="users"
        v-model="form.organizationId"
        :label="$t('general.manager')"
        auto
        required
        outlined
        item-text="name"
        item-value="id"
      ></v-select>
    </div>

    <div class="d-flex my-2">
      <v-text-field
        :label="$t('organization.title')"
        v-model="form.organizationName"
        v-validate="'required'"
        data-vv-name="organizationName"
        :error-messages="$t('error.notEpty')"
        required
      ></v-text-field>
    </div>

    <div class="form-btn">
      <v-btn outline @click="submit" color="primary">{{$t('general.save')}}</v-btn>
      <v-btn outline @click="clear">{{$t('general.reset')}}</v-btn>
    </div>
  </v-form>
</template>



<script>
import axios from "axios";
import { baseUrl, lang, incCounter } from "@/store";
import Swal from "sweetalert2";

export default {
  layout: "dashboard",
  data: () => ({
    message: "",
    saveCard: true,
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
    valid: true,
    form: {
      organizationName: "",
      organizationId: 1,
    },
  }),
  mounted() {
    this.$validator.localize("en", lang);
  },

  methods: {
    submit() {
      var self = this;
      if (this.form.organizationName == "") {
        Swal.fire(
          self.$t("general.error-subject"),
          self.$t("general.fill-field-message"),
          "error"
        );
        this.$validator.validateAll();
        return;
      }
      this.$validator.validateAll();
      var config = {
        method: "post",
        url: baseUrl + "/api/Organizations",
        headers: {},
        data: {
          name: this.form.organizationName,
          ownerId: this.form.organizationId.toString(),
        },
      };
      axios(config)
        .then(function (response) {
          if (response) {
            // self.message = self.$t('general.success');
            Swal.fire({
              title: "Success ! ",

              icon: "info",
              width: "50%",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "ok ",
              cancelButtonText: "Reset",
            }).then((result) => {
              if (result.value) {
                window.location.href =
                  "/" + self.$i18n.locale + "/forms/organization/list";
              }
            });
          }
        })
        .catch(function (error) {});
    },
    clear() {
      this.form = {};
      this.$validator.reset();
    },
  },
};
</script>