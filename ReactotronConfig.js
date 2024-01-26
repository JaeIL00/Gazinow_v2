import Reactotron, { networking, trackGlobalErrors, asyncStorage } from 'reactotron-react-native';

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(
    networking({
      ignoreContentTypes: /^(image)\/.*$/i,
      ignoreUrls: /\/(logs|symbolicate)$/,
    }),
  )
  .use(trackGlobalErrors())
  .use(asyncStorage())
  .connect(); // let's connect!
