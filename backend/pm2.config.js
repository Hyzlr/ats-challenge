module.exports = {
  apps: [
    {
      name: 'eagle-nest',
      script: 'bun',
      args: ['run', 'start', '--', 'app.ts'],
      instances: 'max',
      exec_mode: 'cluster',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
