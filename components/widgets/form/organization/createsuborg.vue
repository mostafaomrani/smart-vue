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

    <v-flex xs12>
      <v-text-field
        :label="$t('externalorganization.name')"
        v-model="form.organizationName"
        v-validate="'required'"
        data-vv-name="organizationName"
        :error-messages="$t('error.notEpty')"
        required
      ></v-text-field>
    </v-flex>

    <v-flex xs12>
      <v-select
        :label="$t('organization.role')"
        :items="roles"
        chips
        :tags="true"
        :multiple="false"
        v-model="rolesdata"
        item-text="name"
        item-value="abbr"
      >
        <template slot="selection" slot-scope="data">
          <v-chip
            close
            @input="data.parent.selectItem(data.item.abbr)"
            class="chip--select-multi"
            :selected="data.selected"
            :key="JSON.stringify(data.item)"
          >{{ data.item.name }}</v-chip>
        </template>
      </v-select>
    </v-flex>

    <div class="form-btn">
      <v-btn outline @click="submit" color="primary">{{$t('general.save')}}</v-btn>
      <v-btn outline @click="clear">{{$t('general.reset')}}</v-btn>
    </div>
  </v-form>
</template>



<script>
import axios from "axios";
import { baseUrl, lang } from "@/store";
import getData from "@/store/axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    complex: {
      orgitems: [],
      projectitems: [],
    },
    roles: [],
    rolesdata: "",
    message: "",
    valid: true,
    form: {
      organizationName: "",
      organizationId: "",
    },
  }),
  mounted() {
    var self = this;
    this.roles = [
      {
        name: "Get Reports",
        abbr: "0",
      },
      {
        name: "Portfo List",
        abbr: "1",
      }
    ];
    getData("get", "/api/Organizations", {}, {}).then((res) => {
      self.complex.orgitems = res.data;
    });
    this.$validator.localize("en", lang);
  },

  methods: {
    submit() {
      var self = this;
      let roles = [];
      for (var data in this.rolesdata) {
        roles.push(parseInt(this.rolesdata[data].abbr));
      }

      getData(
        "post",
        "/api/Organizations/external-organizations",
        {
          organizationId: self.form.organizationId,
          name: self.form.organizationName,
          permissions: roles,
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
            // this.$router.push("/forms/organization/list");
            window.location.href =
              "/" + self.$i18n.locale + "/forms/organization/list";
          }
        });
      });
    },
    clear() {
      this.form = {};
      this.$validator.reset();
    },
  },
};
</script>