import { db } from '../../../db/index.js';
import { coursesParent } from '../shared-parents.js';

export default {
  resource: db.table('course_outcomes'),

  options: {
    parent: coursesParent,

    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      title_en: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      title_ar: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      description_en: {
        type: 'textarea',
        isRequired: true,
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      description_ar: {
        type: 'textarea',
        isRequired: true,
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      course_id: {
        reference: 'courses',
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

    listProperties: [],

    editProperties: [],
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
