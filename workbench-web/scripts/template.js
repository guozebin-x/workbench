module.exports = {
  componentTemplate: componentName => {
    return `<template>
  <div class="${componentName}">
    ${componentName}组件
  </div>
</template>
<script>
export default {
  name: '${componentName}',
  props: {
    propA: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {

    };
  }
}
</script>
<style lang="scss" scoped>
.${componentName} {

}
</style>
`
  },
  viewTemplate: viewName => {
    return `<template>
  <div class="${viewName}">
    ${viewName}页面
  </div>
</template>
<script>
// import A from './components/a.vue'
export default {
  name: '${viewName}',
  components: {
    A
  },
  created() {

  },
  data() {
    return {

    };
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
.${viewName} {

}
</style>
`
  }
}
