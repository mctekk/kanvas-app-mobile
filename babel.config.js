// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

// @ts-nocheck
module.exports = function (api) {
  const plugins = [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js', '.ts', '.tsx'],
        alias: {
          screens: './src/screens',
          services: './src/services',
          navigations: './src/navigations',
          stacks: './src/navigations/stacks',
          atoms: './src/components/atoms',
          molecules: './src/components/molecules',
          organisms: './src/components/organisms',
          context: './src/components/context',
          utils: './src/utils',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ];

  if (api) {
    const babelEnv = api.env();
    api.cache(true);
    const removeConsoleLogs = ['transform-remove-console', { exclude: ['error', 'warn'] }];
    if (babelEnv !== 'development') {
      plugins.push(removeConsoleLogs);
    }
  }
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins,
  };
};
