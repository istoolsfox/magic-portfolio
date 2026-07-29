module.exports = {
  apps: [
    {
      name: "portfolio",
      script: "npm",
      args: "start",
      cwd: "/home/toolsfox/magic-portfolio",
      // 保险：崩溃循环最多10次就停止，不再无限重启打爆云盘IOPS
      max_restarts: 10,
      // 活不过30秒视为异常启动
      min_uptime: "30s",
      // 每次重启间隔5秒起步，指数退避最长到60秒
      restart_delay: 5000,
      exp_backoff_restart_delay: 5000,
      // 内存超过400M自动重启，防止拖垮1.6G小内存机器
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
