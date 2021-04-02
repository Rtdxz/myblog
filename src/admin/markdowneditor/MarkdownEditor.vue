<template>
  <div>
    <mavon-editor v-model="value" />
  </div>
</template>

<script>
export default {
  name: "MarkDownEditor",
  components: {},
  directives: {},
  data() {
    return {
      value: "",
      defaultData: "preview",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>