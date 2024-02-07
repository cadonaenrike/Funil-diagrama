/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";
import tw from "tw-elements/dist/plugin.cjs";

export default {
  content: ["./src/**/*.tsx", "node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin, tw],
};
