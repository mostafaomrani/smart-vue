<template>
  <v-form v-model="valid">
    <v-alert v-if="message" type="success" :value="true">{{message}}</v-alert>
    <v-layout row wrap>
      <v-flex sm6 lg6>
        <v-select
          @change="setorg($event)"
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
          :label="$t('project.name')"
          auto
           v-validate="'required'"
          outlined
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>

      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('resource.resourcename')"
          v-model="form.resourcesName"
          v-validate="'required'"
          data-vv-name="resourcesName"
          :error-messages="$t('error.notEpty')"
          required
        ></v-text-field>
      </v-flex>
      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('resource.resourcetitle')"
          v-model="form.resourcesTitle"
          v-validate="'required'"
          data-vv-name="resourcesTitle"
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
import Swal from 'sweetalert2'
import directory from "@/api/directory";
import  { baseUrl,lang, incCounter }   from "@/store";


export default {
      layout: "dashboard",
  data: () => ({
    complex: {
      orgitems: [],
      projectitems: [],
    },
    message: "",
    saveCard: true,
    projects: [],
    valid: true,
    form: {
      resourcesName: "",
      resourcesTitle: "",
      organizationId: "",
      projectId: "",
      expireDate: "1399-01-01",
    },
  }),
  mounted() {
    this.$validator.localize ("fa", lang);
    var self = this;
    this.$nextTick(() => {
      self.$nuxt.$loading.start();
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


        axios
        .get( baseUrl + "/api/Organizations", {
          headers: "",
        })
        .then(function (response) {
          self.complex.orgitems = response.data;
          console.log(self.complex.orgitems);
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => self.$nuxt.$loading.finish(), 500);
    });
  },
  methods: {
    submit() {

      var self = this;
      if(this.form.organizationId == '' || this.form.resourcesName == '' || this.form.resourcesTitle == ''){
              Swal.fire(
                'خطا !',
                'لطفا تمامی فیلد ها را پر نمایید  :)',
                'error'
              )
              this.$validator.validateAll();
              return
      }

      var config = {
        method: "post",
        url: baseUrl + "/api/Resources",
        headers: {},
        data: {
          "projectId": self.form.projectId,
          "name": self.form.resourcesName,
          "title": self.form.resourcesTitle
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
                    "/" + self.$i18n.locale + "/forms/resources/list";
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
    setorg(id){
      var self = this;
      axios
        .get(baseUrl + "/api/Projects/" + id, {
          headers: "",
        })
        .then(function (response) {
          self.projects = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>