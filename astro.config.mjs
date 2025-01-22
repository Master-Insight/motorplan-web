// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: "server", // se cambio de static a server
  integrations: [tailwind(), react()],
  adapter: vercel(),
  env: {
    schema: {
      CORREO: envField.string({context: "server", access: "secret"}),
      PASS: envField.string({context: "server", access: "secret"}),
      CORREO_RECUP: envField.string({context: "server", access: "secret"}),
      ID_GOOGLE: envField.string({context: "server", access: "secret"}),
      SHEETS: envField.string({context: "server", access: "secret"}),
      GOOGLE_SHEETS_ID: envField.string({context: "server", access: "secret"}),
      GOOGLE_SERVICE_ACCOUNT_EMAIL: envField.string({context: "server", access: "secret"}),
      GOOGLE_PRIVATE_KEY: envField.string({context: "server", access: "secret"})
    }
  }
});