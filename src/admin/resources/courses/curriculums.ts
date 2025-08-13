import { db } from '../../../db/index.js';
import { coursesParent } from '../shared-parents.js';

export default {
  resource: db.table('curriculums'),

  options: {
    parent: coursesParent,

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

    listProperties: ['id', 'name_en', 'name_ar', 'course_id', 'created_at'],
    showProperties: [
      'id',
      'name_en',
      'name_ar',
      'description_en',
      'description_ar',
      'course_id',
      'created_at',
      'updated_at',
    ],
    editProperties: ['name_en', 'name_ar', 'description_en', 'description_ar', 'course_id'],
    filterProperties: ['name_en', 'course_id', 'created_at'],

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
