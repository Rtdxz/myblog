<template>
  <div>
    <div class="side-bar hidden-sm-and-down">
      <personal-card></personal-card>
    </div>
  </div>
</template>

<script>
import PersonalCard from "./PersonalCard";
import { request } from "@/network/request";
export default {
  name: "Sidebar",
  components: {
    PersonalCard,
  },
  directives: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getUserInfo() {
      request({
        url: "/api/article/count",
        methods: "get",
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
.side-bar {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  /* background-color: orange; */
  height: 600px;
}
</style>