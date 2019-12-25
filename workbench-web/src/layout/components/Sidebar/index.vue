<template>
  <div class="sidebar-main">
    <div class="sidebar-name">meicai-sso</div>
    <ul class="menu">
      <router-link to="/dashboard" tag="li" class="menu-item">总览</router-link>
      <router-link to="/configuration" tag="li" class="menu-item">配置</router-link>
      <router-link to="/tasks" tag="li" class="menu-item">任务</router-link>
      <router-link to="/blocks" tag="li" class="menu-item">资产</router-link>
      <router-link to="/tools" tag="li" class="menu-item">工具</router-link>
    </ul>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.sidebar-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0 30px;
  width: 144px;
  margin: 0 auto;
  font-weight: 700;
  color: hsla(0, 0%, 100%, 0.85);
}
.menu {
  list-style: none;
  .menu-item {
    height: 40px;
    line-height: 40px;
    color: hsla(0, 0%, 100%, 0.65);
    font-size: 14px;
    padding-left: 24px;
  }
}
.router-link-active {
  background: #3b3a45;
  color: #fff !important;
}
</style>
