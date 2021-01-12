<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm6>
          <h3>{{$t('client.externalorgclient')}}</h3>
        </v-flex>

        <v-flex sm6 class="text-left">
          <v-btn color="primary" dark :to="'/' + $i18n.locale + '/forms/organization/create-client'" target="_self">
           {{$t('client.createClient')}}
            <v-icon dark right>check_circle</v-icon>
          </v-btn>
        </v-flex>

        <v-layout row wrap>
          <v-flex sm6 lg6>
            <v-card>
              <div class="paddinglable">{{$t('client.title1')}}</div>
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
            </v-card>
          </v-flex>

          <v-flex sm6 lg6>
            <v-card>
              <div class="paddinglable">{{$t('client.title2')}}</div>

              <v-select
                :items="complex.organizationExternal"
                v-model="form.organizationExternalId"
                :label="$t('externalorganization.title')"
                auto
                @change="change($event)"
                v-validate="'required'"
                outlined
                item-text="name"
                item-value="id"
              ></v-select>
            </v-card>
          </v-flex>
        </v-layout>

        <v-flex lg12 v-if="flag != false">
          <v-card>
            <v-card class="paddingdata">{{$t('externalorganization.title')}}} : {{complex.externalDetail.name}}</v-card>
            <v-toolbar card color="white">
              <v-text-field
                flat
                solo
                prepend-icon="search"
                :placeholder="$t('general.search')"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="id"
                select-all
                v-model="complex.selected"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                  </td>
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.clientId }}</td>
                  <td>{{ props.item.clientName }}</td>
                  <td>{{ props.item.createdDate }}</td>
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { Items as Users } from "@/api/user";
import axios from "axios";
import { baseUrl, lang, incCounter } from "@/store";

export default {
  layout: "dashboard",
  data() {
    return {
      flag: false,
      search: "",
      complex: {
        orgitems: [],
        organizationExternal: [],
        selected: [],
        externalDetail: "",
        headers: [
          {
            text: "#",
            value: "id",
          },
          {
            text: this.$t('client.id'),
            value: "name",
          },
          {
            text: this.$t('client.name'),
            value: "clientname",
          },
          {
            text: this.$t('general.date'),
            value: "name",
          },
          {
            text: this.$t('general.action'),
            value: "",
          },
        ],
        items: [],
      },
      projects: [],
      form: {
        organizationId: "",
        organizationExternalId: "",
      },
    };
  },
  mounted() {
    var self = this;
    this.$nextTick(() => {
      self.$nuxt.$loading.start();
      axios
        .get(baseUrl + "/api/Organizations", {
          headers: "",
        })
        .then(function (response) {
          self.complex.orgitems = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => self.$nuxt.$loading.finish(), 500000000);
    });
  },
  methods: {
    setorg(id) {
      var self = this;
      axios
        .get(baseUrl + "/api/Organizations/" + id + "/external-organizations", {
          headers: "",
        })
        .then(function (response) {
          self.complex.organizationExternal = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    change(id) {
      var self = this;
      axios
        .get(baseUrl + "/api/Clients/external-organization/" + id, {
          headers: "",
        })
        .then(function (response) {
          self.complex.items = response.data;
          self.flag = true;
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(baseUrl + "/api/Organizations/external-organizations/" + id, {
          headers: "",
        })
        .then(function (response) {
          self.complex.externalDetail = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>


<style scoped>
.p-all-5 {
  padding: 14px !important;
}
</style>