import { db } from '../../../db/index.js';
import { locationsParent } from '../shared-parents.js';

export default {
  resource: db.table('countries'),

  options: {
    parent: locationsParent,
    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      name_en: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      name_ar: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      iso: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
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

    listProperties: ['id', 'name_en', 'name_ar', 'iso', 'created_at'],
    showProperties: ['id', 'name_en', 'name_ar', 'iso', 'created_at', 'updated_at'],
    editProperties: ['name_en', 'name_ar', 'iso'],
    filterProperties: ['name_en', 'iso', 'created_at'],

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
