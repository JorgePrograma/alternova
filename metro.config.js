const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

<<<<<<< HEAD
=======
config.resolver.assetExts.push('ico');

config.resolver.sourceExts.push('cjs');

>>>>>>> d6a14a4 (se mejorlo la conexion a firebase)
module.exports = withNativeWind(config, { input: './global.css' })