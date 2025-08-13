import { db } from '../../../db/index.js';
import { coursesParent } from '../shared-parents.js';
import { Components } from '../../component-loader.js';
import {
  saveCourseCategories,
  saveCourseCurriculum,
  saveCourseOutcomes,
  saveCourseTrainers,
} from './course-helpers.js';
import { client } from '../../../db/postgres-client.js';

const createResourceActionHandler = (queryFn, dataKey) => ({
  actionType: 'resource',
  isVisible: false,
  component: false,
  handler: async (request, response, context) => {
    try {
      const data = await queryFn();
      return { [dataKey]: data };
    } catch (error) {
      console.error(`Error in ${dataKey} handler:`, error);
      throw error;
    }
  },
});

// Helper function to create record action handlers
const createRecordActionHandler = (queryFn, dataKey) => ({
  actionType: 'record',
  isVisible: false,
  component: false,
  handler: async (request, response, context) => {
    const { record } = context;
    const { recordId } = request.params;

    try {
      const data = await queryFn(recordId);
      return {
        record: { ...record.toJSON(), params: request.params },
        [dataKey]: data,
      };
    } catch (error) {
      console.error(`Error in ${dataKey} handler:`, error);
      throw error;
    }
  },
});

// Helper function to handle custom properties in before hooks
const handleCustomPropertiesBefore = (request, context, propertyNames) => {
  propertyNames.forEach((prop) => {
    if (request.payload[prop]) {
      context[prop] = request.payload[prop];
      delete request.payload[prop];
    }
  });
  return request;
};

// Helper function to handle custom properties in after hooks
const handleCustomPropertiesAfter = async (response, context, courseId, isNew = true) => {
  const { outcomes, curriculum, categories, trainers } = context;

  const operations = [
    { data: outcomes, saveFn: saveCourseOutcomes, name: 'outcomes' },
    { data: curriculum, saveFn: saveCourseCurriculum, name: 'curriculum' },
    { data: categories, saveFn: saveCourseCategories, name: 'categories' },
    { data: trainers, saveFn: saveCourseTrainers, name: 'trainers' },
  ];

  for (const { data, saveFn, name } of operations) {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        await saveFn(parsedData, courseId, context._admin, isNew);
      } catch (error) {
        console.error(`Error saving ${name}:`, error);
        throw error;
      }
    }
  }
};

// Property configurations
const propertyConfigs = {
  id: {
    isVisible: { list: true, show: true, edit: false, filter: true },
  },
  name: {
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
  description_en: {
    type: 'textarea',
    props: { rows: 5, cols: 15 },
    isVisible: { list: false, show: true, edit: true, filter: false },
  },
  description_ar: {
    type: 'textarea',
    props: { rows: 5, cols: 15 },
    isVisible: { list: false, show: true, edit: true, filter: false },
  },
  start_date: {
    type: 'date',
    isVisible: { list: true, show: true, edit: true, filter: true },
  },
  price: {
    type: 'number',
    isVisible: { list: true, show: true, edit: true, filter: true },
  },
  city_id: {
    isVisible: { list: true, show: true, edit: true, filter: true },
  },
  picture: {
    type: 'string',
    components: { edit: Components.ImageUploader },
    isVisible: { edit: true, list: true, show: true, filter: false },
  },

  created_at: {
    type: 'datetime',
    isVisible: { list: true, show: true, edit: false, filter: true },
  },
  updated_at: {
    type: 'datetime',
    isVisible: { list: false, show: true, edit: false, filter: false },
  },
};

// Custom relationship properties
const customProperties = {
  trainers: {
    type: 'mixed',
    isVisible: { list: false, show: false, edit: true, filter: false },
    components: { edit: Components.CourseTrainersManager },
  },
  outcomes: {
    type: 'mixed',
    isVisible: { list: false, show: false, edit: true, filter: false },
    components: { edit: Components.CourseOutcomesManager },
  },
  curriculum: {
    type: 'mixed',
    isVisible: { list: false, show: false, edit: true, filter: false },
    components: { edit: Components.CurriculumManager },
  },
  categories: {
    type: 'mixed',
    isVisible: { list: false, show: false, edit: true, filter: false },
    components: { edit: Components.CategorySelector },
  },
};

// Query functions for different data types
const queryFunctions = {
  outcomes: (courseId) =>
    client
      .query('SELECT * FROM course_outcomes WHERE course_id = $1 ORDER BY id', [courseId])
      .then((result) => result.rows || []),

  curriculum: (courseId) =>
    client
      .query('SELECT * FROM curriculums WHERE course_id = $1 ORDER BY id', [courseId])
      .then((result) => result.rows || []),

  categories: (courseId) =>
    client
      .query(
        `SELECT c.* FROM categories c
     INNER JOIN course_categories cc ON c.id = cc.category_id
     WHERE cc.course_id = $1`,
        [courseId]
      )
      .then((result) => result.rows || []),

  allCategories: () => client.query('SELECT * FROM categories ORDER BY name_en').then((result) => result.rows || []),

  categoriesForSelect: () =>
    client.query('SELECT id, name_en, name_ar FROM categories ORDER BY name_en').then((result) => {
      const categories = result.rows || [];
      return categories.map((category) => ({
        value: category.id,
        label: `${category.name_en} / ${category.name_ar}`,
      }));
    }),

  allTrainers: () =>
    client
      .query('SELECT id, name_en, name_ar, title_en, title_ar, trainer_picture FROM trainers ORDER BY name_en')
      .then((result) => result.rows || []),

  courseTrainers: (courseId) =>
    client
      .query(
        `SELECT t.* FROM trainers t
     INNER JOIN course_trainers ct ON t.id = ct.trainer_id
     WHERE ct.course_id = $1`,
        [courseId]
      )
      .then((result) => result.rows || []),
};

export default {
  resource: db.table('courses'),

  options: {
    parent: coursesParent,

    properties: {
      ...propertyConfigs,
      ...customProperties,
    },

    listProperties: [],
    showProperties: [],
    editProperties: [],
    filterProperties: ['title_en', 'city_id', 'start_date'],

    actions: {
      new: {
        before: async (request, context) =>
          handleCustomPropertiesBefore(request, context, ['outcomes', 'curriculum', 'categories', 'trainers']),

        after: async (response, request, context) => {
          const { outcomes, curriculum, categories, trainers, ...courseData } = request.payload;

          const courseResult = await client.query(
            `INSERT INTO courses (name, title_en, title_ar, description_en, description_ar, start_date, price, city_id, picture)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                   RETURNING id`,
            [
              courseData.name,
              courseData.title_en,
              courseData.title_ar,
              courseData.description_en,
              courseData.description_ar,
              courseData.start_date,
              courseData.price,
              courseData.city_id,
              courseData.picture,
            ]
          );

          const courseId = courseResult.rows[0].id;
          if (courseId) {
            await handleCustomPropertiesAfter(response, context, courseId, true);
          }
          return response;
        },
      },

      edit: {
        before: async (request, context) =>
          handleCustomPropertiesBefore(request, context, ['outcomes', 'curriculum', 'categories', 'trainers']),

        after: async (response, request, context) => {
          const courseId = response.record.params.id;
          if (courseId) {
            await handleCustomPropertiesAfter(response, context, courseId, false);
          }
          return response;
        },
      },

      delete: {},

      show: {
        before: async (request) => request,
      },

      list: {
        before: async (request) => {
          request.query = { ...request.query };
          return request;
        },
      },
      // Data retrieval actions
      getOutcomes: createRecordActionHandler(queryFunctions.outcomes, 'outcomes'),
      getCurriculum: createRecordActionHandler(queryFunctions.curriculum, 'curriculum'),
      getCategories: createRecordActionHandler(queryFunctions.categories, 'categories'),
      getCourseTrainers: createRecordActionHandler(queryFunctions.courseTrainers, 'trainers'),

      getAllCategories: createResourceActionHandler(queryFunctions.allCategories, 'categories'),
      getCategoriesForSelect: createResourceActionHandler(queryFunctions.categoriesForSelect, 'categories'),
      getAllTrainers: createResourceActionHandler(queryFunctions.allTrainers, 'trainers'),
    },
  },
};
