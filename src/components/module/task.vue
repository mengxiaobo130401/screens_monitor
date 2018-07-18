<template>
  <div class="task">
    <div class="task-title">任务与事件</div>
    <div class="task-body">
      <el-table class="task-body-table" :data="monitor[type].task" max-height="680" style="width:100%">
        <el-table-column
          prop="user_name"
          label="用户"
          show-overflow-tooltip
          width="480">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="时间"
          show-overflow-tooltip
          width="450">
        </el-table-column>
        <el-table-column
          prop="description"
          show-overflow-tooltip
          label="描述">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      vuegConfig: {
        disable:false
      }
    }
  },
  props: ['monitor', 'type']
}
</script>

<style scoped lang="scss">
  .task {
    height: 100%;
    padding: 100px 80px 0;
    &-title {
      position: absolute;
      font-size: 36px;
      color: #fbfbf9;
      left: 44.5%;
      top: 2%;
    }
    &-body {
      width: 100%;
      height: 80%;
      &-table {
        font-size: 32px;
        background: #0e1d35;
      }
    }
  }
</style>
