docker_build(
  'tschwaa/app',
  '.',
  dockerfile='Dockerfile.dev',
  build_args={'node_env': 'development'},
  entrypoint='yarn dev',
  live_update=[
    sync('.', '/app'),
    run('cd /app && yarn install', trigger=['./package.json', './yarn.lock']),
    run('touch /app/index.ts'),
  ]
)
