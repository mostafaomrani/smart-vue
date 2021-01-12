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
          :label="$t('organization.role')"
          :items="complex.permissions"
          chips
          :tags="true"
          :multiple="false"
          v-model="permissionsdata"
          item-text="title"
          item-value="id"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="data.parent.selectItem(data.item.id)"
              class="chip--select-multi"
              :selected="data.selected"
              :key="JSON.stringify(data.item)"
            >{{ data.item.title }}</v-chip>
          </template>
        </v-select>
      </v-flex>

      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('roles.name')"
          v-model="form.roleName"
          v-validate="'required'"
          data-vv-name="roleName"
          required
        ></v-text-field>
      </v-flex>

      <v-flex sm6 lg6>
        <v-text-field
          :label="$t('roles.title')"
          v-model="form.roleTitle"
          v-validate="'required'"
          data-vv-name="roleTitle"
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
    permissionsdata: null,
    isMobile: false,
    showresource: false,
    showForm: false,
    complex: {
      permissions: [],
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
      roleName: "",
      roleTitle: "",
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
      getData("get", "/api/Organizations",{},{}).then((res) => {
        self.complex.orgitems = res.data;
      });
      setTimeout(() => self.$nuxt.$loading.finish(), 500);
    });
  },
  methods: {
    submit() {
      var self = this;

      let permissions = [];
      for (var data in this.permissionsdata) {
        permissions.push(parseInt(this.permissionsdata[data].id));
      }

      if (
        this.form.roleName == "" ||
        this.form.roleTitle == "" 
      ) {
        Swal.fire("خطا !", "لطفا تمامی فیلد ها را پر نمایید  :)", "error");
        this.$validator.validateAll();
        return;
      } else {
        getData(
          "post",
          "/api/Roles",
          {
            title: this.form.roleTitle,
            name: this.form.roleName,
            description: this.form.description,
            status: 1,
            permission: permissions,
            projectId: this.form.projectId,
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
            confirmButtonText: "Ok",
            cancelButtonText: "Reset",
          }).then((result) => {
            if (result.value) {
              window.location.href =
                "/" + self.$i18n.locale + "/forms/roles/list";
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
      getData("get", "/api/Projects/" + orgId, {},{}).then((res) => {
        self.projects = res.data;
      });
    },
    changeResource(resourceId) {
      this.form.resourceId = resourceId;
      this.showForm = true;
    },
    changeproject(projectId) {
      getData(
        "get",
        "/api/Permissions/" + projectId + "/permissions",
        {},
        {}
      ).then((res) => {
        this.complex.permissions = res.data;
      });
      this.form.projectId = projectId;
    },
  },
};
</script>