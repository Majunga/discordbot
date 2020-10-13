module.exports = {
  crossorigin: 'use-credentials',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: false
      }
    }
  }
}
