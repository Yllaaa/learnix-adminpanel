import { db } from '../../../db/index.js';
import { trainersParent } from '../shared-parents.js';
import { Components } from '../../component-loader.js';

export default {
  resource: db.table('trainers'),

  options: {
    parent: trainersParent,

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
      title_en: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      title_ar: {
        isRequired: true,
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      linked_in: {
        type: 'string',
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      trainer_picture: {
        type: 'string',
        components: { edit: Components.ImageUploader },
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      lead_weekend: {
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

    listProperties: ['id', 'name_en', 'title_en', 'lead_weekend', 'created_at'],
    showProperties: [
      'id',
      'name_en',
      'name_ar',
      'title_en',
      'title_ar',
      'linked_in',
      'trainer_picture',
      'lead_weekend',
      'created_at',
      'updated_at',
    ],
    editProperties: [
      'name',
      'name_en',
      'name_ar',
      'title_en',
      'title_ar',
      'linked_in',
      'trainer_picture',
      'lead_weekend',
    ],
    filterProperties: ['name_en', 'lead_weekend', 'created_at'],

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
