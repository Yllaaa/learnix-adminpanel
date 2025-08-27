import { db } from '../../../db/index.js';
import { applicationsParent } from '../shared-parents.js';

export default {
  resource: db.table('course_registeration'),

  options: {
    parent: applicationsParent,

    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      full_name: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      email: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      job_title: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      company_name: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      city_id: {
        reference: 'cities',
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      trainer_id: {
        reference: 'trainers',
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      status: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        availableValues: [
          { value: 'pending', label: 'Pending' },
          { value: 'accepted', label: 'Accepted' },
          { value: 'rejected', label: 'Rejected' },
          { value: 'completed', label: 'Completed' },
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
