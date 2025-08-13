import { db } from '../../../db/index.js';
import { coursesParent } from '../shared-parents.js';

export default {
  resource: db.table('course_trainers'),

  options: {
    parent: coursesParent,

    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      course_id: {
        reference: 'courses.id',
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      trainer_id: {
        reference: 'trainers.id',
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

    listProperties: ['id', 'course_id', 'trainer_id', 'created_at'],
    showProperties: ['id', 'course_id', 'trainer_id', 'created_at', 'updated_at'],
    editProperties: ['course_id', 'trainer_id'],
    filterProperties: ['course_id', 'trainer_id', 'created_at'],

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
