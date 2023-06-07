const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/scss/variables.scss";
        @import "./src/scss/app.scss";`,
      },
    },
    sourceMap: true,
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("v-"),
    },
  },
  transpileDependencies: true,
});
