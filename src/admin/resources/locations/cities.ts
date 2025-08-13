import { Components } from '../../component-loader.js';
import { db } from '../../../db/index.js';
import { locationsParent } from '../shared-parents.js';

export default {
  resource: db.table('cities'),

  options: {
    parent: locationsParent,

    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      name: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      nameEn: { isRequired: true, isVisible: { list: true, show: true, edit: true, filter: true } },
      name_ar: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      country_id: {
        reference: 'countries',
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      city_picture: {
        type: 'string',
        components: { edit: Components.ImageUploader },
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      created_at: {
        type: 'datetime',
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      updated_at: {
        type: 'datetime',
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
    },

    listProperties: ['id', 'name', 'name_en', 'name_ar', 'country_id', 'city_picture', 'created_at'],
    showProperties: ['id', 'name', 'name_en', 'name_ar', 'country_id', 'city_picture', 'created_at', 'updated_at'],
    editProperties: ['name', 'name_en', 'name_ar', 'country_id', 'city_picture'],
    filterProperties: ['name_en', 'country_id', 'created_at'],

    actions: {
      new: {},
      edit: {},
      delete: {},
      show: {
        before: async (request) => {
          return request;
        },
      },
      list: {
        before: async (request) => {
          request.query = {
            ...request.query,
          };
          return request;
        },
      },
    },
  },
};
