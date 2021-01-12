<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          <v-card class="mb-4">
            <v-toolbar color="primary" dark flat dense cad>
              <v-toolbar-title class="subheading">{{$t('project.createproject')}}</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <payment-form></payment-form>
            </v-card-text>
          </v-card>
         
        </v-flex>
        
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import VWidget from '@/components/VWidget';
  import EventForm from '@/components/widgets/form/EventForm';
  import ContactForm from '@/components/widgets/form/ContactForm';
  import PaymentForm from '@/components/widgets/form/projects/create';
  import ShipmentForm from '@/components/widgets/form/ShipmentForm';

  export default {
        layout: "dashboard",
    components: {
      VWidget,
      ContactForm,
      PaymentForm,
      ShipmentForm,
      EventForm
    },
    data() {
      return {};
    },
    computed: {},
    methods: {}
  };
</script>
