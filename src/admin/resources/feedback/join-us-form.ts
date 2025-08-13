import { db } from '../../../db/index.js';
import { messagesParent } from '../shared-parents.js';

export default {
  resource: db.table('join_us_form'),

  options: {
    parent: messagesParent,

    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      email: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      is_resolved: {
        type: 'boolean',
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

    listProperties: ['id', 'email', 'is_resolved', 'created_at'],
    showProperties: ['id', 'email', 'is_resolved', 'created_at', 'updated_at'],
    editProperties: ['email', 'is_resolved'],
    filterProperties: ['email', 'is_resolved', 'created_at'],

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
