
<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>{{complex.orgitem.name}} {{$t('general.detail')}}</h3>
        </v-flex>

        <v-flex sm12 lg12>
          <v-card class="custompadding">
            <div>
              <strong>{{$t("general.name")}}</strong>
              : {{complex.orgitem.name}}
            </div>
            <div>
              <strong>{{$t("general.createdate")}}</strong>
              : {{complex.orgitem.creationDate}}
            </div>
            <div>
              <strong>{{$t("general.OrganizationOwners")}}</strong> :
              <ul>
                <li
                  v-for="owner in complex.orgitem.organizationOwners"
                  :key="owner"
                >{{owner.firstName}}</li>
              </ul>
            </div>
          </v-card>
        </v-flex>

        <v-flex sm12>
          <h3> {{$t('general.project')}}</h3>
        </v-flex>

        <v-flex sm12 lg12>
          <v-card class="custompadding">
            <v-data-table
              :headers="complex.headers"
              :search="search"
              :items="complex.items"
              :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
              class="elevation-1 text-left"
              item-key="id"
              select-all
              v-model="complex.selected"
            >
              <template slot="items" slot-scope="props">
                <td><v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                </td>
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.title }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import getData from "@/store/axios";
export default {
  validate({ params }) {
    if (params.id != 11 && params) return /^\d+$/.test(params.id);
  },
  layout: "dashboard",
  data() {
    return {
        search: "",
      complex: {
        orgitem: "",
        items:[],
        headers: [
          {
            text: "#",
            value: "id",
          },
          {
            text: this.$t("project.name"),
            value: "name",
          },
          {
            text: this.$t("project.title"),
            value: "creationDate",
          }
        ],
      },
    };
  },
  mounted() {
    var self = this;
    console.log(this.$route.params.id);
    this.$nextTick(() => {
      self.$nuxt.$loading.start();
      getData(
        "get",
        "/api/Organizations/" + this.$route.params.id,
        {},
        {}
      ).then((res) => {
        self.complex.orgitem = res.data;
      });
      getData("get", "/api/Projects/" + this.$route.params.id, {}, {}).then(
        (res) => {
          self.complex.items = res.data;
        }
      );
      setTimeout(() => self.$nuxt.$loading.finish(), 50);
    });
  },
};
</script>
<style scoped>
.custompadding {
  padding: 16px;
}
.custompadding div {
  margin-bottom: 14px;
}
</style>