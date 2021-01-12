<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-dialog v-model="dialogDetails" max-width="700">
          <v-card>
            <v-card-title class="headline">Organization detail</v-card-title>

            <v-card-text>
              <ul class="listyle" v-for="org in complex.orgdetails" :key="org.id">
                <li>{{org.name}} {{org.creationDate}}</li>
              </ul>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialogDetails = false"
              >{{$t('general.close')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" max-width="700">
          <v-card>
            <v-card-title class="headline">{{$t('externalorganization.name')}}</v-card-title>

            <v-card-text>
              <ul class="listyle" v-for="org in complex.externalorg" :key="org.id">
                <li>{{org.name}}</li>
              </ul>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">{{$t('general.close')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-flex sm6>
          <h3>{{$t('organization.title')}}</h3>
        </v-flex>
        <v-flex class="text-left">
          <v-btn
            color="primary"
            dark
            :to="'/'+ $i18n.locale + '/forms/organization/sub'"
            target="_self"
          >
            {{$t('externalorganization.externalorg')}}
            <v-icon dark right>check_circle</v-icon>
          </v-btn>

          <v-btn
            color="primary"
            dark
            :to="'/' + $i18n.locale + '/forms/organization/create'"
            target="_self"
          >
            {{$t('organization.externalorg')}}
            <v-icon dark right>check_circle</v-icon>
          </v-btn>
        </v-flex>

        <v-flex lg12>
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
            <v-card-text class="pa-0 text-left">
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
                  <td>
                    <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                  </td>
                  <td>{{ props.item.id }}</td>
                  <td>
                    <v-btn :to="'/' + $i18n.locale + '/forms/organization/detail/' + props.item.id">
                      {{ props.item.name }}
                      <v-icon>filter_list</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ props.item.creationDate }}</td>
                  <td>
                    <v-btn
                      :title="$t('externalorganization.title')"
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="orange"
                       :to="'/' + $i18n.locale + '/forms/organization/external/' + props.item.id"
                      small
                    >
                      <v-icon>list</v-icon>
                    </v-btn>

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

<script src="@/services/organizations/organization-list.js"></script>


