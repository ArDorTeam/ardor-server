module.exports = {
    apps : [
      {
        name: "api_v1",
        script: "./dist/main.js",
        instances: '1',
        instance_var: 'INSTANCE_ID',
        exec_mode: 'fork'
      }
    ]
  }