<template>
  <div class="home">
    <el-input v-model="id" placeholder="请输入mock文档id"></el-input>
    <el-button type="primary" @click="createApi">生成</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      id: ""
    };
  },
  methods: {
    createApi() {
      _api.home.getCreateApi({ id: this.id }).then(res => {
        if (res.data == true) {
          this.$message({
            message: "生成成功",
            type: "success"
          });
        }
      });
    }
  }
};
</script>
