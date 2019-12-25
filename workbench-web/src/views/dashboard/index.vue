<template>
  <el-container>
    <el-header>
      <h1>总览</h1>
    </el-header>
    <el-main>
      <el-input v-model="id" placeholder="请输入mock文档id"></el-input>
      <el-button type="primary" @click="createApi">生成</el-button>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src


export default {
  name: "home",
  components: {
    
  },
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
