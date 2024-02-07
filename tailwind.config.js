import flowbitePlugin from "flowbite/plugin";
import tw from "tw-elements/dist/plugin.cjs";
import withMT from "@material-tailwind/react/utils/withMT";

// eslint-disable-next-line no-undef
module.exports = withMT({
  content: [
    "./src/**/*.tsx",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin, tw],
});
