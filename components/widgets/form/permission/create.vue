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
          @change="changeResource"
          :items="complex.resource"
          v-model="form.resourceId"
          :label="$t('resource.title')"
          auto
          v-validate="'required'"
          outlined
          item-text="resourceName"
          item-value="id"
          single-line
        ></v-select>
      </v-flex>

      <v-flex sm6 lg6>
        <v-text-field
         :label="$t('general.permisstionName')"
          v-model="form.permisionName"
          v-validate="'required'"
          data-vv-name="permisionName"
          required
        ></v-text-field>
      </v-flex>

      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('general.permisstionTitle')"
          v-model="form.permisionTitle"
          v-validate="'required'"
          data-vv-name="permisionTitle"
          required
        ></v-text-field>
      </v-flex>

      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('general.description')"
          v-model="form.description"
          v-validate="'required'"
          data-vv-name="description"
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
      resourceId: null,
      organizationId: "",
      projectId: "",
      permisionName: "",
      permisionTitle: "",
      description: "",
      redirectUrl: "",
      logoutUrl: "",
    },
  }),
  mounted() {
    this.$validator.localize("fa", lang);
    var self = this;
    this.$nextTick(() => {
      self.$nuxt.$loading.start();
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
        this.form.permisionName == "" ||
        this.form.permisionTitle == "" ||
        this.form.description == ""
      ) {
        Swal.fire("خطا !", "لطفا تمامی فیلد ها را پر نمایید  :)", "error");
        this.$validator.validateAll();
        return;
      } else {
        getData(
          "post",
          "/api/Permissions",
          {
            projectId: self.form.projectId,
            name: self.form.permisionName,
            title: self.form.permisionTitle,
            resourceId: self.form.resourceId,
            description: self.form.description,
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
               window.location.href =  "/" +  self.$i18n.locale + "/forms/permissions/list"
            }
          });
        });
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
  },
};
</script>