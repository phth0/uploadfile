
module.exports = {
  apps: [
    {
      name: 'uploadfile',
      script: './dist/main.js',
      watch: false,
      ignore_watch: ['[/\\]./', '.git', 'node_modules', 'src/schema.graphql'],
      instances: 1,
      exec_mode: 'cluster',
      increment_var: 'PORT',
      shutdown_with_message: true,
      listen_timeout: 10000,
      env: {
        NODE_ENV: 'development',
        TZ: 'Asia/Beijing',
      },
      env_release: {},
      env_staging: {
        PORT: 3100,
        NODE_ENV: 'staging',
        UPLOAD: '/data/clientlog',
      },
      env_dev: {},
    },
  ],

  deploy: {
    staging: {
      user: 'root',
      host: '140.143.22.156',
      ref: 'origin/master',
      repo: 'git@github.com:phth0/uploadfile.git',
      path: '/data/prod/uploadfile',
      'pre-deploy-local':
        'GIT_SSH_COMMAND="ssh -i ~/.ssh/gh_uploadfile" git pull',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js && pm2 startOrRestart ecosystem.config.js --env staging',
      'pre-setup': '',
    },
  },
};
