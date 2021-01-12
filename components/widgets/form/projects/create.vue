<template>
  <v-form v-model="valid">
    <v-alert v-if="message" type="success" :value="true">{{message}}</v-alert>

    <div class="d-flex my-2">
      <v-select
        :items="complex.orgitems"
        v-model="form.organizationId"
        :label="$t('organization.title')"
        auto
        v-validate="'required'"
        outlined
        item-text="name"
        item-value="id"
      ></v-select>
    </div>

    <v-layout row wrap>
      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('project.name')"
          v-model="form.organizationName"
          v-validate="'required'"
          data-vv-name="organizationName"
          :error-messages="$t('error.notEpty')"
          required
        ></v-text-field>
      </v-flex>
      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('project.title')"
          v-model="form.organizationTitle"
          v-validate="'required'"
          data-vv-name="organizationTitle"
          :error-messages="$t('error.notEpty')"
          required
        ></v-text-field>
      </v-flex>
    </v-layout>

    <div class="form-btn">
      <v-btn outline @click="submit" color="primary">{{$t('general.save')}}</v-btn>
      <v-btn outline @click="clear">{{$t('general.rest')}}</v-btn>
    </div>
  </v-form>
</template>



<script>
import axios from "axios";
import directory from "@/api/directory";
import Swal from "sweetalert2";
import { baseUrl, lang, incCounter } from "@/store";

export default {
  layout: "dashboard",
  data: () => ({
    message: "",
    saveCard: true,
    valid: true,
    complex: {
      orgitems: [],
      projectitems: [],
    },
    form: {
      organizationTitle: "",
      organizationName: "",
      organizationId: 1,
    },
    dictionary: directory,
  }),
  mounted() {
    var self = this;
    axios
      .get(baseUrl + "/api/Organizations", {
        headers: "",
      })
      .then(function (response) {
        self.complex.orgitems = response.data;
        console.log(self.complex.orgitems);
      })
      .catch((error) => {
        console.log(error);
      });
    this.$validator.localize("fa", lang);
  },

  methods: {
    submit() {
      var self = this;
      if (
        this.form.organizationId == "" ||
        this.form.organizationTitle == "" ||
        this.form.organizationName == ""
      ) {
        Swal.fire("خطا !", "لطفا تمامی فیلد ها را پر نمایید  :)", "error");
        this.$validator.validateAll();
        return;
      } else {
        var config = {
          method: "post",
          url: baseUrl + "/api/Projects",
          headers: {},
          data: {
            name: self.form.organizationName,
            title: self.form.organizationTitle,
            organizationId: self.form.organizationId,
          },
        };
        axios(config)
          .then(function (response) {
            if (response) {
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
                    "/" + self.$i18n.locale + "/forms/projects/list";
                }
              });
            }
          })
          .catch(function (error) {});
      }
    },
    clear() {
      this.form = {};
      this.$validator.reset();
    },
  },
};
</script>