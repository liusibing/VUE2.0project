module.exports = {
  presets: ["@vue/cli-plugin-babel/preset",
    [
      '@vue/babel-preset-jsx',{
         'injectH':false  //在vue中使用jsx文件==> 使用render代替template
      }
    ]
  ]
};
