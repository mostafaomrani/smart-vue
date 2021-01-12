<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
         <v-flex lg12 class="margin-auto">
         
             <div><strong>- External organization can be granted access to organization resource.</strong></div>
         
        </v-flex>
        <v-flex lg12 class="margin-auto">
          <v-card class="mb-4">
            <v-toolbar color="primary" dark flat dense cad>
             
              <v-toolbar-title class="subheading">{{$t('externalorganization.externalorg')}}</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class>
              <createform></createform>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from "@/components/VWidget";
import EventForm from "@/components/widgets/form/EventForm";
import ContactForm from "@/components/widgets/form/ContactForm";
import createform from "@/components/widgets/form/organization/createsuborg";
import ShipmentForm from "@/components/widgets/form/ShipmentForm";

export default {
  layout: "dashboard",
  components: {
    VWidget,
    ContactForm,
    createform,
    ShipmentForm,
    EventForm,
  },
  data() {
    return {
     
    };
  },
  computed: {},
  methods: {},
};
</script>
