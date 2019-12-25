<template>
  <div class="page">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="item.name" :name="item.name" v-for="(item,index) in list" :key="index">
        <el-input
          type="textarea"
          :rows="30"
          placeholder="请输入内容"
          v-model="item.content"
          style="width:800px;"
          class="api-textarea"
        ></el-input>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      list: [],
      activeName: ""
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    getApi() {
      _api.home.getAllApi().then(res => {
        console.log(res.data[0].content);
        this.list = res.data;
        this.activeName = this.list[0].name;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  /deep/.el-tabs__item {
    color: #fff;
  }
  /deep/.el-tabs__item.is-active {
    color: #1890ff;
  }
  /deep/ .el-tabs__nav-wrap::after {
    background-color: #000;
  }
}
.api-textarea /deep/ {
  textarea {
    background-color: #000 !important;
  }
}
</style>
