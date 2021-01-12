import getData from "@/store/axios";

export default {
  layout: "dashboard",
  data() {
    return {
      dialog: false,
      dialogDetails :false,
      search: "",
      complex: {
        orgdetails : null,
        selected: [],
        externalorg: [],
        headers: [
          {
            text: "#",
            value: "id",
          },
          {
            text: this.$t("general.name"),
            value: "name",
          },
          {
            text: this.$t("general.createdate"),
            value: "creationDate",
          },
          {
            text: this.$t("general.action"),
            value: "opration",
          },
        ],
        items: [],
      },
    };
  },
  methods: {
    showexternalorg(orgId) {
      var self = this;
      self.$nuxt.$loading.start();
      getData(
        "get",
        "/api/Organizations/" + orgId + "/external-organizations",
        {},
        {}
      ).then((res) => {
        self.complex.externalorg = res.data;
      });
      this.dialog = true;
    },
    showDetails(id) {
     var self = this;
      self.$nuxt.$loading.start();
      getData("get","/api/Organizations/" + id, {},{}).then((res) => {
        self.complex.orgdetails = res;
      });

      this.dialogDetails = true;
    },
  },
  mounted() {
    var self = this;
    this.$nextTick(() => {
      self.$nuxt.$loading.start();
      getData("get", "/api/Organizations/", {}, {}).then((res) => {
        self.complex.items = res.data;
      });
      setTimeout(() => self.$nuxt.$loading.finish(), 50);
    });
  },
};