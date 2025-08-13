import { db } from '../../../db/index.js';
import { coursesParent } from '../shared-parents.js';

export default {
  resource: db.table('course_categories'),

  options: {
    parent: coursesParent,

    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      course_id: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      category_id: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
    },

    listProperties: [],
    showProperties: [],
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
