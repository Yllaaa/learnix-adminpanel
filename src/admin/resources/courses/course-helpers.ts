import { client } from '../../../db/postgres-client.js';

// Generic function to handle database operations
const executeQuery = async (query, params = []) => {
  try {
    const result = await client.query(query, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Generic delete function
const deleteRelatedData = async (table, courseId) => {
  await executeQuery(`DELETE FROM ${table} WHERE course_id = $1`, [courseId]);
};

// Generic save function for course relationships (many-to-many)
const saveRelationshipData = async (table, courseId, dataIds, foreignKeyColumn) => {
  for (const dataId of dataIds) {
    // Check if relationship already exists
    const existingResult = await executeQuery(
      `SELECT id FROM ${table} WHERE course_id = $1 AND ${foreignKeyColumn} = $2`,
      [courseId, dataId]
    );

    // Insert only if it doesn't exist
    if (existingResult.rows.length === 0) {
      await executeQuery(
        `INSERT INTO ${table} (course_id, ${foreignKeyColumn}, created_at, updated_at)
         VALUES ($1, $2, NOW(), NOW())`,
        [courseId, dataId]
      );
    }
  }
};

// Generic save function for course data (one-to-many)
const saveCourseData = async (table, courseId, dataArray, columns, isNew = true) => {
  try {
    // Delete existing data if not new
    if (!isNew) {
      await deleteRelatedData(table, courseId);
    }

    // Insert new data
    for (const item of dataArray) {
      const values = columns.map((col) => item[col]);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
      const columnNames = columns.join(', ');

      await executeQuery(
        `INSERT INTO ${table} (${columnNames}, course_id, created_at, updated_at) 
         VALUES (${placeholders}, $${values.length + 1}, NOW(), NOW())`,
        [...values, courseId]
      );
    }
  } catch (error) {
    console.error(`Error saving ${table}:`, error);
    throw error;
  }
};

// Specific functions for different data types
export async function saveCourseOutcomes(outcomes, courseId, admin, isNew = true) {
  const columns = ['title_en', 'title_ar', 'description_en', 'description_ar'];
  await saveCourseData('course_outcomes', courseId, outcomes, columns, isNew);
}

export async function saveCourseCurriculum(curriculum, courseId, admin, isNew = true) {
  const columns = ['name_en', 'name_ar', 'description_en', 'description_ar'];
  await saveCourseData('curriculums', courseId, curriculum, columns, isNew);
}

export async function saveCourseCategories(categoryIds, courseId, admin, isNew = true) {
  try {
    if (!isNew) {
      await deleteRelatedData('course_categories', courseId);
    }
    await saveRelationshipData('course_categories', courseId, categoryIds, 'category_id');
  } catch (error) {
    console.error('Error saving course categories:', error);
    throw error;
  }
}

export async function saveCourseTrainers(trainerIds, courseId, admin, isNew = true) {
  try {
    if (!isNew) {
      await deleteRelatedData('course_trainers', courseId);
    }
    await saveRelationshipData('course_trainers', courseId, trainerIds, 'trainer_id');
  } catch (error) {
    console.error('Error saving course trainers:', error);
    throw error;
  }
}

// Generic fetch functions
const fetchData = async (query, params = []) => {
  try {
    const result = await executeQuery(query, params);
    return result.rows || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Fetch functions for categories
export async function getAllCategories() {
  return fetchData('SELECT id, name_en, name_ar FROM categories ORDER BY name_en');
}

export async function getCourseCategories(courseId) {
  return fetchData(
    `SELECT c.* FROM categories c
     INNER JOIN course_categories cc ON c.id = cc.category_id
     WHERE cc.course_id = $1`,
    [courseId]
  );
}

// Fetch functions for trainers
export async function getAllTrainers() {
  return fetchData('SELECT id, name_en, name_ar, title_en, title_ar, picture FROM trainers ORDER BY name_en');
}

export async function getCourseTrainers(courseId) {
  return fetchData(
    `SELECT t.* FROM trainers t
     INNER JOIN course_trainers ct ON t.id = ct.trainer_id
     WHERE ct.course_id = $1`,
    [courseId]
  );
}

// Fetch functions for outcomes and curriculum
export async function getCourseOutcomes(courseId) {
  return fetchData('SELECT * FROM course_outcomes WHERE course_id = $1 ORDER BY id', [courseId]);
}

export async function getCourseCurriculum(courseId) {
  return fetchData('SELECT * FROM curriculums WHERE course_id = $1 ORDER BY id', [courseId]);
}

export async function getCategoriesForSelect() {
  const categories = await getAllCategories();
  return categories.map((category: any) => ({
    value: category.id,
    label: `${category.name_en} / ${category.name_ar}`,
  }));
}
