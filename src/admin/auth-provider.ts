import { DefaultAuthProvider } from 'adminjs';

import { componentLoader } from './component-loader.js';

const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return { email };
    }
    return null;
  },
});

export default provider;
