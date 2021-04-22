<template>
  <div>
    <Type :type="type"></Type>
  </div>
</template>

<script>
import Type from "@/components/content/Type";
export default {
  name: "Home",
  components: {
    Type,
  },
  directives: {},
  data() {
    return {
      type: "index",
    };
  },
  created() {},

  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>