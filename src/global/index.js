export default global = {
  time: {
    overviewTime : 10 * 60 * 1000, //10分钟
    taskTime : 60 * 1000, //1分钟
  },
  task: {
    start_time: new Date(new Date().setHours(0, 0, 0, 0)) / 1000, //当天0点
  }
}
