const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../src/main/resources/static/vueStatic',
	devServer: {
		proxy: 'http://localhost'
	}
})
