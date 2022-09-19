load('ext://restart_process', 'docker_build_with_restart')

docker_build_with_restart(
  'tschwaa/app',
  '.',
  dockerfile='Dockerfile.dev',
  build_args={'node_env': 'development'},
  entrypoint='yarn dev',
  live_update=[
    sync('.', '/app'),
    run('cd /app && yarn install', trigger=['./package.json', './yarn.lock'])
  ]
)
