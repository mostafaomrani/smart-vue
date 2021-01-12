<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
     
        <v-flex sm12>
          <h3>{{$t('roles.pagetitle')}}</h3>
        </v-flex>

        <v-flex sm12 class="text-left">
          <v-btn color="primary" dark :to="'/' + $i18n.locale +  '/forms/roles/create'" target="_self">
            {{$t('roles.createroles')}}
            <v-icon dark right>check_circle</v-icon>
          </v-btn>
        </v-flex>

        <v-layout row wrap>
          <v-flex sm6 lg6>
            <v-card>
              <div class="paddinglable">{{$t('organization.select')}}</div>
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
            </v-card>
          </v-flex>
          <v-flex sm6 lg6>
            <v-card>
              <div class="paddinglable">{{$t('project.select')}}</div>
              <v-select
                :items="projects"
                v-model="form.projectId"
                :label="$t('project.title')"
                auto
                @change="change"
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
                item-key="name"
                select-all
                v-model="complex.selected"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                  </td>

                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.title }}</td>
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
import getData from "@/store/axios";

export default {
  layout: "dashboard",
  data() {
    return {
      flag: false,
      search: "",
      complex: {
        orgitems: [],
        projectitems: [],
        selected: [],
        headers: [
          {
            text: "#",
            value: "id",
          },
          {
            text: this.$t('permission.name'),
            value: "name",
          },
          {
            text: this.$t('permission.title'),
            value: "title",
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
      },
    };
  },
  mounted() {
    var self = this;
    this.$nextTick(() => {
      self.$nuxt.$loading.start();
      getData("get", "/api/Organizations", {}, {}).then((res) => {
        self.complex.orgitems = res.data;
      });
      setTimeout(() => self.$nuxt.$loading.finish(), 5000);
    });
  },
  methods: {
    setorg(id) {
      var self = this;
      getData("get", "/api/Projects/" + id, {}, {}).then((res) => {
        self.projects = res.data;
      });
    },
    change(id) {
      var self = this;
      getData("get", "/api/Roles/" +  id + "/roles", {}, {}).then((res) => {
        self.complex.items = res.data;
        self.flag = true;
      });
    },
  },
};
</script> 