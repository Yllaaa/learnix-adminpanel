import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  CourseOutcomesManager: componentLoader.add('CourseOutcomesManager', './components/CourseOutcomesManager'),
  CurriculumManager: componentLoader.add('CurriculumManager', './components/CurriculumManager'),
  CategorySelector: componentLoader.add('CategorySelector', './components/CategorySelector'),
  CourseTrainersManager: componentLoader.add('CourseTrainersManager', './components/CourseTrainersManager'),
  ImageUploader: componentLoader.add('ImageUploader', './components/ImageUploader'),
};

export { componentLoader, Components };
