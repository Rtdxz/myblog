<template>
  <div>
    <div class="side-bar hidden-sm-and-down">
      <personal-card></personal-card>
    </div>
  </div>
</template>

<script>
import PersonalCard from "./PersonalCard";

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
    getUserInfo() {},
  },
};
</script>

<style scoped>
.side-bar {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  /* background-color: orange; */
}
</style>