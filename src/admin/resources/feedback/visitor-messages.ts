import { db } from '../../../db/index.js';
import { formsParent } from '../shared-parents.js';

export default {
  resource: db.table('vistor_messages'),

  options: {
    parent: formsParent,

    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      name: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      email: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      subject: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      message: {
        type: 'textarea',
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      status: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        availableValues: [
          { value: 'pending', label: 'Pending' },
          { value: 'resolved', label: 'Resolved' },
          { value: 'reopened', label: 'Reopened' },
        ],
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

    listProperties: ['id', 'name', 'email', 'subject', 'status', 'created_at'],
    showProperties: ['id', 'name', 'email', 'subject', 'message', 'status', 'created_at', 'updated_at'],
    editProperties: ['name', 'email', 'subject', 'message', 'status'],
    filterProperties: ['name', 'email', 'status', 'created_at'],

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
