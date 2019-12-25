<template>
  <el-container>
    <el-container>
      <el-aside width="200px">
        <Sidebar />
      </el-aside>

      <router-view></router-view>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import Sidebar from "./components/Sidebar";
export default {
  name: "Layout",
  components: {
    Sidebar
  }
};
</script>
<style lang="scss">
.el-container.is-vertical {
  min-height: 100vh;
}
.el-main {
  padding: 0 !important;
}
.el-header {
  padding: 0 !important;
  height: 62px !important;
  border-bottom: 2px solid #000;
}
.el-aside {
  background: #30303d;
}
.el-footer {
  background-color: #fff;
}
</style>
