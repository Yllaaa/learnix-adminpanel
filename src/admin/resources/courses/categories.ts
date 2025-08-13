import { db } from '../../../db/index.js';
import { coursesParent } from '../shared-parents.js';

export default {
  resource: db.table('categories'),

  options: {
    parent: coursesParent,

    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      name: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      name_en: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      name_ar: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      description_en: {
        type: 'textarea',
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      description_ar: {
        type: 'textarea',
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
    },

    listProperties: [],
    showProperties: [],
    editProperties: ['name', 'name_en', 'name_ar', 'description_en', 'description_ar'],
    filterProperties: [],

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
