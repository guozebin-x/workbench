<template>
  <el-container>
    <el-header>
      <h1>工具</h1>
    </el-header>
    <el-main>
      <div class="index-module">
        <div class="column-panel">
          <div class="column-row" @click="switchActive('Api')">
            <div class="column-panel-icon">
              <i class="el-icon-sort"></i>
            </div>
            <div class="column-col">
              <div class="column-panel-index_title">接口生成</div>
              <div class="column-panel-description">根据mock平台生成接口</div>
            </div>
          </div>

          <div class="column-row" @click="switchActive('Page')">
            <div class="column-panel-icon">
              <i class="el-icon-tickets"></i>
            </div>
            <div class="column-col">
              <div class="column-panel-index_title">页面生成</div>
              <div class="column-panel-description">table+crud页面生成</div>
            </div>
          </div>
        </div>

        <div class="column-panel-index_right">
          <component :is="currentTabComponent"></component>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Api from "./components/api.vue";
import Page from "./components/page.vue";
export default {
  name: "home",
  components: {
    Api,
    Page
  },
  data() {
    return {
      id: "",
      currentTabComponent: "Api"
    };
  },
  watch: {
    "$route.query": {
      handler(val) {
        this.currentTabComponent = val.active;
      },
      immediate: true
    }
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
    },
    switchActive(name) {
      if (this.$route.query.active == name) return;
      this.$router.push({ path: "/tools", query: { active: name } });
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
  .column-row {
    cursor: pointer;
    padding: 12px;
    display: flex;
    align-items: center;
    height: 51px;
    .column-panel-icon {
      margin: 0 12px;
    }
    i {
      width: 24px;
      height: 24px;
      font-size: 24px;
    }
    .column-panel-index_title {
      font-size: 14px;
      color: hsla(0, 0%, 100%, 0.85);
      margin-bottom: 6px;
    }
    .column-panel-description {
      color: hsla(0, 0%, 100%, 0.45);
      font-size: 12px;
    }
  }
}
.column-panel-index_right {
  padding: 16px 24px;
}
</style>
