<template>
  <el-container>
    <el-header>
      <h1>配置</h1>
    </el-header>
    <el-main>
      <div class="index-module">
        <div class="column-panel">
          <ul>
            <li>接口配置</li>
          </ul>
        </div>
        <div class="column-panel-index_right">
          <el-input v-model="id" placeholder="请输入mock文档id"></el-input>
          <el-button type="primary" @click="createApi">生成</el-button>
        </div>
      </div>
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
<style lang="scss" scoped>
.el-main {
  height: calc(100% - 90px);
}
.index-module {
  display: flex;
  height: 100%;
}
.column-panel {
  width: 255px;
  height: 100%;
  border-right: 1px solid #000;
  transition: width 0.3s;
}
</style>
