import { AdminJSOptions } from 'adminjs';
import { componentLoader } from './component-loader.js';
import { adminResources } from './resources/index.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: adminResources,
  databases: [],
  branding: {
    companyName: 'Learnix Admin',
    withMadeWithLove: false,
    logo: process.env.LOGO_URL,
    favicon: process.env.LOGO_URL,
  },
};

export default options;
