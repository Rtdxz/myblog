<template>
  <div>
    <Type :type="type"></Type>
  </div>
</template>

<script>
import Type from "@/components/content/Type";
export default {
  name: "Key",
  components: {
    Type,
  },
  directives: {},
  data() {
    return {
      type: "key",
    };
  },
  created() {},

  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>