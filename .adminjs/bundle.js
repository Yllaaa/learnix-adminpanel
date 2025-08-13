(function (React, designSystem, adminjs) {
    'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var React__default = /*#__PURE__*/_interopDefault(React);

    const CourseOutcomesManager = props => {
      const {
        record,
        onChange
      } = props;
      const [outcomes, setOutcomes] = React.useState([]);
      const [loading, setLoading] = React.useState(false);
      const [expandedIndex, setExpandedIndex] = React.useState(0);
      const api = new adminjs.ApiClient();
      React.useEffect(() => {
        const fetchOutcomes = async () => {
          if (record.id) {
            setLoading(true);
            try {
              const response = await api.recordAction({
                resourceId: 'courses',
                recordId: record.id,
                actionName: 'getOutcomes'
              });
              if (response.data?.outcomes) {
                setOutcomes(response.data.outcomes);
              } else {
                setOutcomes([createEmptyOutcome()]);
              }
            } catch (error) {
              console.error('Error fetching outcomes:', error);
              window.alert('Failed to load outcomes. Please try again.');
            } finally {
              setLoading(false);
            }
          } else {
            setOutcomes([createEmptyOutcome()]);
          }
        };
        fetchOutcomes();
      }, [record.id]);
      const createEmptyOutcome = () => ({
        title_en: '',
        title_ar: '',
        description_en: '',
        description_ar: ''
      });
      const addOutcome = e => {
        e.preventDefault();
        const newOutcomes = [...outcomes, createEmptyOutcome()];
        setOutcomes(newOutcomes);
        updateRecordValue(newOutcomes);
        setExpandedIndex(newOutcomes.length - 1);
      };
      const removeOutcome = index => {
        const newOutcomes = [...outcomes];
        newOutcomes.splice(index, 1);
        setOutcomes(newOutcomes);
        updateRecordValue(newOutcomes);
        setExpandedIndex(null);
      };
      const handleOutcomeChange = (index, field, value) => {
        const newOutcomes = [...outcomes];
        newOutcomes[index] = {
          ...newOutcomes[index],
          [field]: value
        };
        setOutcomes(newOutcomes);
        updateRecordValue(newOutcomes);
      };
      const updateRecordValue = updatedOutcomes => {
        onChange('outcomes', JSON.stringify(updatedOutcomes));
      };
      if (loading) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "lg"
        }, "Loading course outcomes...");
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          marginBottom: '44px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl",
        pb: "md",
        style: {
          borderBottom: '2px solid #eaeaea'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xl",
        fontWeight: "bold",
        color: "grey80"
      }, "Course Outcomes"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm",
        color: "grey60"
      }, "Manage the learning outcomes for this course")), outcomes.map((outcome, index) => {
        const isExpanded = expandedIndex === index;
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          key: outcome.id || index,
          mb: "lg",
          p: "lg",
          style: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            cursor: !isExpanded ? 'pointer' : 'default'
          },
          onClick: () => {
            if (!isExpanded) setExpandedIndex(index);
          }
        }, !isExpanded && (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontWeight: "bold",
          fontSize: "md",
          color: "primary100"
        }, "Outcome #", index + 1, ": ", outcome.title_en || 'Untitled'), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          variant: "sm",
          color: "grey60"
        }, "Click to expand"))), isExpanded && (/*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontWeight: "bold",
          fontSize: "lg",
          color: "primary100"
        }, "Outcome #", index + 1), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
          variant: "danger",
          size: "sm",
          onClick: () => removeOutcome(index)
        }, "Remove")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Title (English)*"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
          type: "text",
          value: outcome.title_en,
          width: "100%",
          onChange: e => handleOutcomeChange(index, 'title_en', e.target.value),
          required: true
        })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Title (Arabic)*"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
          type: "text",
          value: outcome.title_ar,
          width: "100%",
          onChange: e => handleOutcomeChange(index, 'title_ar', e.target.value),
          required: true
        })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Description (English)*"), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
          value: outcome.description_en,
          width: "100%",
          rows: 3,
          onChange: e => handleOutcomeChange(index, 'description_en', e.target.value),
          required: true
        })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Description (Arabic)*"), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
          value: outcome.description_ar,
          width: "100%",
          rows: 3,
          onChange: e => handleOutcomeChange(index, 'description_ar', e.target.value),
          required: true
        })))));
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "lg",
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        type: "button",
        onClick: addOutcome,
        variant: "primary"
      }, "+ Add New Outcome")));
    };

    const CurriculumManager = props => {
      const {
        record,
        onChange
      } = props;
      const [curriculumItems, setCurriculumItems] = React.useState([]);
      const [loading, setLoading] = React.useState(false);
      const [expandedIndex, setExpandedIndex] = React.useState(0);
      const api = new adminjs.ApiClient();
      React.useEffect(() => {
        const fetchCurriculum = async () => {
          if (record.id) {
            setLoading(true);
            try {
              const response = await api.recordAction({
                resourceId: 'courses',
                recordId: record.id,
                actionName: 'getCurriculum'
              });
              if (response.data?.curriculum) {
                setCurriculumItems(response.data.curriculum);
              } else {
                setCurriculumItems([createEmptyCurriculumItem()]);
              }
            } catch (error) {
              console.error('Error fetching curriculum:', error);
              window.alert('Failed to load curriculum. Please try again.');
            } finally {
              setLoading(false);
            }
          } else {
            setCurriculumItems([createEmptyCurriculumItem()]);
          }
        };
        fetchCurriculum();
      }, [record.id]);
      const createEmptyCurriculumItem = () => ({
        name_en: '',
        name_ar: '',
        description_en: '',
        description_ar: ''
      });
      const addCurriculumItem = e => {
        e.preventDefault();
        const newItems = [...curriculumItems, createEmptyCurriculumItem()];
        setCurriculumItems(newItems);
        updateRecordValue(newItems);
        setExpandedIndex(newItems.length - 1);
      };
      const removeCurriculumItem = index => {
        const newItems = [...curriculumItems];
        newItems.splice(index, 1);
        setCurriculumItems(newItems);
        updateRecordValue(newItems);
        setExpandedIndex(null);
      };
      const handleCurriculumChange = (index, field, value) => {
        const newItems = [...curriculumItems];
        newItems[index] = {
          ...newItems[index],
          [field]: value
        };
        setCurriculumItems(newItems);
        updateRecordValue(newItems);
      };
      const moveCurriculumItem = (index, direction) => {
        if (direction === 'up' && index === 0 || direction === 'down' && index === curriculumItems.length - 1) {
          return;
        }
        const newItems = [...curriculumItems];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
        setCurriculumItems(newItems);
        updateRecordValue(newItems);
        setExpandedIndex(newIndex);
      };
      const updateRecordValue = updatedItems => {
        onChange('curriculum', JSON.stringify(updatedItems));
      };
      if (loading) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading curriculum...");
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          marginBottom: '44px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl",
        pb: "md",
        style: {
          borderBottom: '2px solid #eaeaea'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xl",
        fontWeight: "bold",
        color: "grey80"
      }, "Course Curriculum"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm",
        color: "grey60"
      }, "Manage the curriculum items for this course")), curriculumItems.map((item, index) => {
        const isExpanded = expandedIndex === index;
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          key: item.id || index,
          mb: "lg",
          p: "lg",
          style: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            cursor: !isExpanded ? 'pointer' : 'default'
          },
          onClick: () => {
            if (!isExpanded) setExpandedIndex(index);
          }
        }, !isExpanded && (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontWeight: "bold",
          fontSize: "md",
          color: "primary100"
        }, "Curriculum Item #", index + 1, ": ", item.name_en || 'Untitled'), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          variant: "sm",
          color: "grey60"
        }, "Click to expand"))), isExpanded && (/*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontWeight: "bold",
          fontSize: "lg",
          color: "primary100"
        }, "Curriculum Item #", index + 1), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
          type: "button",
          variant: "text",
          size: "icon",
          mr: "default",
          disabled: index === 0,
          onClick: e => {
            e.stopPropagation();
            moveCurriculumItem(index, 'up');
          }
        }, "\u2191"), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
          type: "button",
          variant: "text",
          size: "icon",
          mr: "default",
          disabled: index === curriculumItems.length - 1,
          onClick: e => {
            e.stopPropagation();
            moveCurriculumItem(index, 'down');
          }
        }, "\u2193"), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
          variant: "danger",
          size: "icon",
          onClick: e => {
            e.stopPropagation();
            removeCurriculumItem(index);
          }
        }, "X"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Name (English)*"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
          type: "text",
          value: item.name_en,
          width: "100%",
          onChange: e => handleCurriculumChange(index, 'name_en', e.target.value),
          required: true
        })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Name (Arabic)*"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
          type: "text",
          value: item.name_ar,
          width: "100%",
          onChange: e => handleCurriculumChange(index, 'name_ar', e.target.value),
          required: true
        })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mb: "lg"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Description (English)*"), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
          value: item.description_en,
          width: "100%",
          rows: 3,
          onChange: e => handleCurriculumChange(index, 'description_en', e.target.value),
          required: true
        })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Description (Arabic)*"), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
          value: item.description_ar,
          width: "100%",
          rows: 3,
          onChange: e => handleCurriculumChange(index, 'description_ar', e.target.value),
          required: true
        })))));
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        textAlign: "center",
        mt: "xl",
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        type: "button",
        onClick: addCurriculumItem,
        variant: "primary"
      }, "+ Add Curriculum Item")));
    };

    const CategorySelector = props => {
      const {
        record,
        onChange
      } = props;
      const [availableCategories, setAvailableCategories] = React.useState([]);
      const [selectedCategoryIds, setSelectedCategoryIds] = React.useState([]);
      const [searchTerm, setSearchTerm] = React.useState('');
      const [loading, setLoading] = React.useState(false);
      const api = new adminjs.ApiClient();
      React.useEffect(() => {
        const fetchAllCategories = async () => {
          setLoading(true);
          try {
            const response = await api.resourceAction({
              resourceId: 'courses',
              actionName: 'getAllCategories'
            });
            if (response.data && response.data.categories) {
              setAvailableCategories(response.data.categories);
            }
          } catch (error) {
            console.error('Error fetching categories:', error);
            setAvailableCategories([]);
          } finally {
            setLoading(false);
          }
        };
        fetchAllCategories();
      }, []);
      React.useEffect(() => {
        const fetchSelectedCategories = async () => {
          if (record.id) {
            try {
              const response = await api.recordAction({
                resourceId: 'courses',
                recordId: record.id,
                actionName: 'getCategories'
              });
              if (response.data && response.data.categories) {
                const categoryIds = response.data.categories.map(cat => cat.id);
                setSelectedCategoryIds(categoryIds);
              }
            } catch (error) {
              console.error('Error fetching selected categories:', error);
            }
          }
        };
        if (record.id) {
          fetchSelectedCategories();
        }
      }, [record.id]);
      const handleCategoryToggle = categoryId => {
        const newSelectedIds = selectedCategoryIds.includes(categoryId) ? selectedCategoryIds.filter(id => id !== categoryId) : [...selectedCategoryIds, categoryId];
        setSelectedCategoryIds(newSelectedIds);
        updateRecordValue(newSelectedIds);
      };
      const updateRecordValue = categoryIds => {
        onChange('categories', JSON.stringify(categoryIds));
      };
      const filteredCategories = availableCategories.filter(category => category.name_en.toLowerCase().includes(searchTerm.toLowerCase()) || category.name_ar.toLowerCase().includes(searchTerm.toLowerCase()));
      const selectedCategories = availableCategories.filter(cat => selectedCategoryIds.includes(cat.id));
      if (loading) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading categories...");
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          marginBottom: '44px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl",
        pb: "md",
        style: {
          borderBottom: '2px solid #eaeaea'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xl",
        fontWeight: "bold",
        color: "grey80"
      }, "Course Categories"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm",
        color: "grey60"
      }, "Select categories for this course")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        placeholder: "Search categories...",
        value: searchTerm,
        onChange: e => setSearchTerm(e.target.value),
        style: {
          width: '100%',
          maxWidth: '400px',
          height: '32px',
          padding: '0 12px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          fontSize: '14px',
          outline: 'none'
        }
      })), selectedCategories.length > 0 && (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        variant: "sm"
      }, "Selected (", selectedCategories.length, ")"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        mt: "sm"
      }, selectedCategories.map(category => (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: category.id,
        bg: "primary20",
        px: "12px",
        py: "6px",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        style: {
          border: '1px solid #e0e0e0',
          maxWidth: 'fit-content'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mr: "8px",
        variant: "sm"
      }, category.name_en), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        size: "icon",
        variant: "text",
        onClick: e => {
          e.stopPropagation();
          handleCategoryToggle(category.id);
        },
        style: {
          minWidth: 'auto',
          padding: '0',
          width: '18px',
          height: '18px'
        }
      }, "\u00D7"))))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        variant: "sm"
      }, "Categories (", filteredCategories.length, ")"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "sm",
        mb: "lg",
        style: {
          border: '1px solid #eee',
          borderRadius: '4px',
          height: '300px',
          overflowY: 'auto'
        }
      }, filteredCategories.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "lg",
        textAlign: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60"
      }, "No categories found"))) : filteredCategories.map(category => (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: category.id,
        p: "18px",
        borderBottom: "1px solid #f5f5f5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        style: {
          backgroundColor: selectedCategoryIds.includes(category.id) ? '#f0f7ff' : 'white',
          cursor: 'pointer'
        },
        onClick: () => handleCategoryToggle(category.id)
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm"
      }, category.name_en, " / ", category.name_ar), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          width: '20px',
          height: '20px',
          border: '1px solid #ccc',
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: selectedCategoryIds.includes(category.id) ? '#007bff' : 'white'
        }
      }, selectedCategoryIds.includes(category.id) && (/*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "white",
        fontWeight: "bold",
        fontSize: "10px"
      }, "\u2713")))))))));
    };

    const CourseTrainersManager = props => {
      const {
        record,
        onChange
      } = props;
      const [availableTrainers, setAvailableTrainers] = React.useState([]);
      const [selectedTrainerIds, setSelectedTrainerIds] = React.useState([]);
      const [searchTerm, setSearchTerm] = React.useState('');
      const [loading, setLoading] = React.useState(false);
      const api = new adminjs.ApiClient();
      React.useEffect(() => {
        const fetchAllTrainers = async () => {
          setLoading(true);
          try {
            const response = await api.resourceAction({
              resourceId: 'courses',
              actionName: 'getAllTrainers'
            });
            if (response.data && response.data.trainers) {
              setAvailableTrainers(response.data.trainers);
            } else {
              setAvailableTrainers([]);
            }
          } catch (error) {
            console.error('Error fetching all trainers:', error);
            window.alert('Failed to load trainers. Please try again.');
          } finally {
            setLoading(false);
          }
        };
        fetchAllTrainers();
      }, []);
      React.useEffect(() => {
        const fetchSelectedTrainers = async () => {
          if (record.id) {
            try {
              const response = await api.recordAction({
                resourceId: 'courses',
                recordId: record.id,
                actionName: 'getCourseTrainers'
              });
              if (response.data && response.data.trainers) {
                const trainerIds = response.data.trainers.map(trainer => trainer.id);
                setSelectedTrainerIds(trainerIds);
              }
            } catch (error) {
              console.error('Error fetching selected trainers:', error);
            }
          }
        };
        if (record.id) {
          fetchSelectedTrainers();
        }
      }, [record.id]);
      const handleTrainerToggle = trainerId => {
        const newSelectedIds = selectedTrainerIds.includes(trainerId) ? selectedTrainerIds.filter(id => id !== trainerId) : [...selectedTrainerIds, trainerId];
        setSelectedTrainerIds(newSelectedIds);
        updateRecordValue(newSelectedIds);
      };
      const updateRecordValue = trainerIds => {
        onChange('trainers', JSON.stringify(trainerIds));
      };
      const handleRemoveTrainer = trainerId => {
        const newSelectedIds = selectedTrainerIds.filter(id => id !== trainerId);
        setSelectedTrainerIds(newSelectedIds);
        updateRecordValue(newSelectedIds);
      };
      const filteredTrainers = availableTrainers.filter(trainer => trainer.name_en.toLowerCase().includes(searchTerm.toLowerCase()) || trainer.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) || trainer.title_en.toLowerCase().includes(searchTerm.toLowerCase()) || trainer.title_ar.toLowerCase().includes(searchTerm.toLowerCase()));
      const selectedTrainers = availableTrainers.filter(trainer => selectedTrainerIds.includes(trainer.id));
      if (loading) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading trainers...");
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          marginBottom: '44px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl",
        pb: "md",
        style: {
          borderBottom: '2px solid #eaeaea'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xl",
        fontWeight: "bold",
        color: "grey80"
      }, "Course Trainers"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm",
        color: "grey60"
      }, "Select one or more trainers for this course")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "lg",
        p: "md",
        style: {
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm"
      }, /*#__PURE__*/React__default.default.createElement("strong", null, availableTrainers.length), " trainers available"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm"
      }, /*#__PURE__*/React__default.default.createElement("strong", null, selectedTrainerIds.length), " selected")), selectedTrainers.length > 0 && (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "lg",
        p: "md",
        style: {
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        mb: "sm",
        style: {
          fontSize: '13px'
        }
      }, "Selected Trainers (", selectedTrainers.length, ")"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px'
        }
      }, selectedTrainers.map(trainer => (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: trainer.id,
        style: {
          backgroundColor: '#67d1e7ff',
          color: 'white',
          borderRadius: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          padding: '3px 8px 3px 5px',
          lineHeight: 1.2,
          transition: 'background-color 0.2s ease'
        }
      }, trainer.trainer_picture && (/*#__PURE__*/React__default.default.createElement("img", {
        src: trainer.trainer_picture,
        alt: trainer.name_en,
        style: {
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          objectFit: 'cover'
        }
      })), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          whiteSpace: 'nowrap',
          maxWidth: '120px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }, trainer.name_en), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        size: "icon",
        variant: "text",
        onClick: () => handleRemoveTrainer(trainer.id),
        style: {
          padding: '0',
          minWidth: 'auto',
          color: 'white',
          fontSize: '14px',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          width: '18px',
          height: '18px',
          backgroundColor: 'rgba(255,255,255,0.2)'
        },
        onMouseOver: e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.35)',
        onMouseOut: e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'
      }, "\u00D7"))))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Search Trainers"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        type: "text",
        value: searchTerm,
        width: "100%",
        onChange: e => setSearchTerm(e.target.value),
        placeholder: "Search by name or title..."
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        mb: "md"
      }, "Available Trainers ", searchTerm && `(${filteredTrainers.length} found)`), filteredTrainers.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "xl",
        style: {
          textAlign: 'center',
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "lg",
        color: "grey60"
      }, searchTerm ? 'No trainers match your search' : 'No trainers available'), searchTerm && (/*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        variant: "text",
        mt: "sm",
        onClick: () => setSearchTerm('')
      }, "Clear search")))) : (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, auto)',
          gap: '16px',
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: '#fafafa'
        }
      }, filteredTrainers.map(trainer => {
        const isSelected = selectedTrainerIds.includes(trainer.id);
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          key: trainer.id,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            border: isSelected ? '2px solid #67d1e7ff' : '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: isSelected ? '#f0f8f0' : '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '22px',
            position: 'relative'
          },
          onClick: () => handleTrainerToggle(trainer.id)
        }, isSelected && (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          style: {
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#67d1e7ff',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px'
          }
        }, "\u2713")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          style: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0
          }
        }, trainer.trainer_picture ? (/*#__PURE__*/React__default.default.createElement("img", {
          src: trainer.trainer_picture,
          alt: trainer.name_en,
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        })) : (/*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "lg",
          color: "grey60"
        }, "\uD83D\uDC64"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          style: {
            flex: 1,
            minWidth: 0
          }
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "md",
          fontWeight: "bold",
          mb: "xxs",
          style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }, trainer.name_en), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "sm",
          color: "grey80",
          mb: "xxs",
          style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }, trainer.name_ar), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "sm",
          color: "grey60",
          style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }, trainer.title_en, " / ", trainer.title_ar)), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
          size: "sm",
          variant: isSelected ? 'outlined' : 'primary',
          style: {
            fontSize: '12px',
            padding: '6px 16px',
            flexShrink: 0
          }
        }, isSelected ? 'Selected' : 'Select'));
      })))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "xl",
        pt: "lg",
        style: {
          borderTop: '1px solid #eee',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm",
        color: "grey60"
      }, selectedTrainerIds.length > 0 ? `You have selected ${selectedTrainerIds.length} trainer${selectedTrainerIds.length !== 1 ? 's' : ''}.` : 'No trainers selected yet.')));
    };

    const ImageUploader = ({
      record,
      property,
      onChange
    }) => {
      const [uploading, setUploading] = React.useState(false);
      const [error, setError] = React.useState('');
      const [previewUrl, setPreviewUrl] = React.useState(record.params?.[property.name] || '');
      const [isDragging, setIsDragging] = React.useState(false);
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const handleFileChange = async e => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!validTypes.includes(file.type)) {
          setError('❌ Only JPEG, PNG, and WebP images are allowed.');
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setError('❌ Image must be less than 5MB.');
          return;
        }
        setUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await fetch('/api/upload/image', {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          if (response.ok && data.url) {
            setPreviewUrl(data.url);
            onChange(property.name, data.url);
          } else {
            throw new Error(data.error || 'Upload failed');
          }
        } catch (err) {
          setError(err.message || 'Failed to upload image');
        } finally {
          setUploading(false);
        }
      };
      const handleRemove = () => {
        setPreviewUrl('');
        onChange(property.name, null);
        const fileInput = document.getElementById(`file-upload-${property.name}`);
        if (fileInput) fileInput.value = '';
      };
      const triggerFileInput = () => {
        const fileInput = document.getElementById(`file-upload-${property.name}`);
        if (fileInput) fileInput.click();
      };
      const onDragOver = React.useCallback(e => {
        e.preventDefault();
        setIsDragging(true);
      }, []);
      const onDragLeave = React.useCallback(() => {
        setIsDragging(false);
      }, []);
      const onDrop = React.useCallback(e => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && validTypes.includes(file.type)) {
          const fakeEvent = {
            target: {
              files: [file]
            }
          };
          handleFileChange(fakeEvent);
        } else {
          setError('❌ Only image files are allowed.');
        }
      }, [handleFileChange]);
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xl",
        fontWeight: "bold",
        mb: "xs"
      }, 'Picture'), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm",
        mb: "md",
        color: "grey60"
      }, "PNG, JPG, or WebP \u2022 Max size: 5MB"), error && (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "md",
        mb: "md",
        style: {
          backgroundColor: '#fff5f5',
          border: '1px solid #ffcccc',
          borderRadius: '8px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "red"
      }, error))), previewUrl && (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "md",
        style: {
          position: 'relative',
          display: 'inline-block',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          transition: 'transform 0.2s ease'
        }
      }, /*#__PURE__*/React__default.default.createElement("img", {
        src: previewUrl,
        alt: "Preview",
        style: {
          maxHeight: '150px',
          width: 'auto',
          display: 'block'
        }
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        size: "icon",
        variant: "danger",
        onClick: handleRemove,
        style: {
          position: 'absolute',
          top: '6px',
          right: '6px',
          borderRadius: '50%',
          width: '26px',
          height: '26px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          minWidth: 'unset',
          minHeight: 'unset'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
        icon: "Trash2",
        size: 12
      })))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        border: `2px dashed ${isDragging ? '#007bff' : '#ccc'}`,
        borderRadius: "xl",
        p: "xl",
        textAlign: "center",
        onMouseOver: onDragOver,
        onMouseLeave: onDragLeave,
        onDrop: onDrop,
        onDragOver: onDragOver,
        onClick: triggerFileInput,
        style: {
          backgroundColor: isDragging ? '#f0f8ff' : '#f9fafb',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
        icon: "Upload",
        size: 30
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "md",
        variant: "lg",
        fontWeight: "bold",
        color: isDragging ? 'primary' : 'grey60'
      }, isDragging ? 'Drop your image here' : 'Drag & drop or click to upload'), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm",
        mt: "xs",
        color: "grey50"
      }, "Supports: JPEG, PNG, WebP")), /*#__PURE__*/React__default.default.createElement("input", {
        id: `file-upload-${property.name}`,
        type: "file",
        accept: "image/*",
        onChange: handleFileChange,
        style: {
          display: 'none'
        }
      }), uploading && (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mt: "md",
        display: "flex",
        alignItems: "center",
        gap: "sm"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
        icon: "Loader",
        spin: true
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm",
        color: "primary"
      }, "Uploading..."))));
    };

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.CourseOutcomesManager = CourseOutcomesManager;
    AdminJS.UserComponents.CurriculumManager = CurriculumManager;
    AdminJS.UserComponents.CategorySelector = CategorySelector;
    AdminJS.UserComponents.CourseTrainersManager = CourseTrainersManager;
    AdminJS.UserComponents.ImageUploader = ImageUploader;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvQ291cnNlT3V0Y29tZXNNYW5hZ2VyLmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL0N1cnJpY3VsdW1NYW5hZ2VyLmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL0NhdGVnb3J5U2VsZWN0b3IuanMiLCIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvQ291cnNlVHJhaW5lcnNNYW5hZ2VyLmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXIuanMiLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExhYmVsLCBCb3gsIEJ1dHRvbiwgVGV4dCwgSW5wdXQsIFRleHRBcmVhIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmNvbnN0IENvdXJzZU91dGNvbWVzTWFuYWdlciA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcmVjb3JkLCBvbkNoYW5nZSB9ID0gcHJvcHM7XG4gICAgY29uc3QgW291dGNvbWVzLCBzZXRPdXRjb21lc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtleHBhbmRlZEluZGV4LCBzZXRFeHBhbmRlZEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICAgIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaE91dGNvbWVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlY29yZC5pZCkge1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVjb3JkQWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6ICdjb3Vyc2VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZElkOiByZWNvcmQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnZ2V0T3V0Y29tZXMnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGE/Lm91dGNvbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRPdXRjb21lcyhyZXNwb25zZS5kYXRhLm91dGNvbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE91dGNvbWVzKFtjcmVhdGVFbXB0eU91dGNvbWUoKV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBvdXRjb21lczonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCgnRmFpbGVkIHRvIGxvYWQgb3V0Y29tZXMuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRPdXRjb21lcyhbY3JlYXRlRW1wdHlPdXRjb21lKCldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmV0Y2hPdXRjb21lcygpO1xuICAgIH0sIFtyZWNvcmQuaWRdKTtcbiAgICBjb25zdCBjcmVhdGVFbXB0eU91dGNvbWUgPSAoKSA9PiAoe1xuICAgICAgICB0aXRsZV9lbjogJycsXG4gICAgICAgIHRpdGxlX2FyOiAnJyxcbiAgICAgICAgZGVzY3JpcHRpb25fZW46ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbl9hcjogJycsXG4gICAgfSk7XG4gICAgY29uc3QgYWRkT3V0Y29tZSA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgbmV3T3V0Y29tZXMgPSBbLi4ub3V0Y29tZXMsIGNyZWF0ZUVtcHR5T3V0Y29tZSgpXTtcbiAgICAgICAgc2V0T3V0Y29tZXMobmV3T3V0Y29tZXMpO1xuICAgICAgICB1cGRhdGVSZWNvcmRWYWx1ZShuZXdPdXRjb21lcyk7XG4gICAgICAgIHNldEV4cGFuZGVkSW5kZXgobmV3T3V0Y29tZXMubGVuZ3RoIC0gMSk7XG4gICAgfTtcbiAgICBjb25zdCByZW1vdmVPdXRjb21lID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld091dGNvbWVzID0gWy4uLm91dGNvbWVzXTtcbiAgICAgICAgbmV3T3V0Y29tZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgc2V0T3V0Y29tZXMobmV3T3V0Y29tZXMpO1xuICAgICAgICB1cGRhdGVSZWNvcmRWYWx1ZShuZXdPdXRjb21lcyk7XG4gICAgICAgIHNldEV4cGFuZGVkSW5kZXgobnVsbCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVPdXRjb21lQ2hhbmdlID0gKGluZGV4LCBmaWVsZCwgdmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgbmV3T3V0Y29tZXMgPSBbLi4ub3V0Y29tZXNdO1xuICAgICAgICBuZXdPdXRjb21lc1tpbmRleF0gPSB7IC4uLm5ld091dGNvbWVzW2luZGV4XSwgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgc2V0T3V0Y29tZXMobmV3T3V0Y29tZXMpO1xuICAgICAgICB1cGRhdGVSZWNvcmRWYWx1ZShuZXdPdXRjb21lcyk7XG4gICAgfTtcbiAgICBjb25zdCB1cGRhdGVSZWNvcmRWYWx1ZSA9ICh1cGRhdGVkT3V0Y29tZXMpID0+IHtcbiAgICAgICAgb25DaGFuZ2UoJ291dGNvbWVzJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZE91dGNvbWVzKSk7XG4gICAgfTtcbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcImxnXCIgfSwgXCJMb2FkaW5nIGNvdXJzZSBvdXRjb21lcy4uLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZTogeyBtYXJnaW5Cb3R0b206ICc0NHB4JyB9IH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1iOiBcInhsXCIsIHBiOiBcIm1kXCIsIHN0eWxlOiB7IGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZWFlYWVhJyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sIFwiQ291cnNlIE91dGNvbWVzXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IHZhcmlhbnQ6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJNYW5hZ2UgdGhlIGxlYXJuaW5nIG91dGNvbWVzIGZvciB0aGlzIGNvdXJzZVwiKSksXG4gICAgICAgIG91dGNvbWVzLm1hcCgob3V0Y29tZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzRXhwYW5kZWQgPSBleHBhbmRlZEluZGV4ID09PSBpbmRleDtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsga2V5OiBvdXRjb21lLmlkIHx8IGluZGV4LCBtYjogXCJsZ1wiLCBwOiBcImxnXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZGRkJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDZweCByZ2JhKDAsMCwwLDAuMDUpJyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAhaXNFeHBhbmRlZCA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNFeHBhbmRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEV4cGFuZGVkSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAhaXNFeHBhbmRlZCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIsIGZvbnRTaXplOiBcIm1kXCIsIGNvbG9yOiBcInByaW1hcnkxMDBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJPdXRjb21lICNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiOiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGNvbWUudGl0bGVfZW4gfHwgJ1VudGl0bGVkJyksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyB2YXJpYW50OiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiQ2xpY2sgdG8gZXhwYW5kXCIpKSksXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgbWI6IFwibGdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBmb250U2l6ZTogXCJsZ1wiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk91dGNvbWUgI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ICsgMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyB2YXJpYW50OiBcImRhbmdlclwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IHJlbW92ZU91dGNvbWUoaW5kZXgpIH0sIFwiUmVtb3ZlXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWI6IFwibGdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgXCJUaXRsZSAoRW5nbGlzaCkqXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IG91dGNvbWUudGl0bGVfZW4sIHdpZHRoOiBcIjEwMCVcIiwgb25DaGFuZ2U6IChlKSA9PiBoYW5kbGVPdXRjb21lQ2hhbmdlKGluZGV4LCAndGl0bGVfZW4nLCBlLnRhcmdldC52YWx1ZSksIHJlcXVpcmVkOiB0cnVlIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWI6IFwibGdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgXCJUaXRsZSAoQXJhYmljKSpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogb3V0Y29tZS50aXRsZV9hciwgd2lkdGg6IFwiMTAwJVwiLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZU91dGNvbWVDaGFuZ2UoaW5kZXgsICd0aXRsZV9hcicsIGUudGFyZ2V0LnZhbHVlKSwgcmVxdWlyZWQ6IHRydWUgfSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYjogXCJsZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCBcIkRlc2NyaXB0aW9uIChFbmdsaXNoKSpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7IHZhbHVlOiBvdXRjb21lLmRlc2NyaXB0aW9uX2VuLCB3aWR0aDogXCIxMDAlXCIsIHJvd3M6IDMsIG9uQ2hhbmdlOiAoZSkgPT4gaGFuZGxlT3V0Y29tZUNoYW5nZShpbmRleCwgJ2Rlc2NyaXB0aW9uX2VuJywgZS50YXJnZXQudmFsdWUpLCByZXF1aXJlZDogdHJ1ZSB9KSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgXCJEZXNjcmlwdGlvbiAoQXJhYmljKSpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7IHZhbHVlOiBvdXRjb21lLmRlc2NyaXB0aW9uX2FyLCB3aWR0aDogXCIxMDAlXCIsIHJvd3M6IDMsIG9uQ2hhbmdlOiAoZSkgPT4gaGFuZGxlT3V0Y29tZUNoYW5nZShpbmRleCwgJ2Rlc2NyaXB0aW9uX2FyJywgZS50YXJnZXQudmFsdWUpLCByZXF1aXJlZDogdHJ1ZSB9KSkpKSkpO1xuICAgICAgICB9KSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbXQ6IFwibGdcIiwgbWI6IFwieGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogYWRkT3V0Y29tZSwgdmFyaWFudDogXCJwcmltYXJ5XCIgfSwgXCIrIEFkZCBOZXcgT3V0Y29tZVwiKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBDb3Vyc2VPdXRjb21lc01hbmFnZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExhYmVsLCBCb3gsIEJ1dHRvbiwgVGV4dCwgSW5wdXQsIFRleHRBcmVhIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmNvbnN0IEN1cnJpY3VsdW1NYW5hZ2VyID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcbiAgICBjb25zdCBbY3VycmljdWx1bUl0ZW1zLCBzZXRDdXJyaWN1bHVtSXRlbXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZXhwYW5kZWRJbmRleCwgc2V0RXhwYW5kZWRJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hDdXJyaWN1bHVtID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlY29yZC5pZCkge1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVjb3JkQWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6ICdjb3Vyc2VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZElkOiByZWNvcmQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnZ2V0Q3VycmljdWx1bScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YT8uY3VycmljdWx1bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3VycmljdWx1bUl0ZW1zKHJlc3BvbnNlLmRhdGEuY3VycmljdWx1bSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyaWN1bHVtSXRlbXMoW2NyZWF0ZUVtcHR5Q3VycmljdWx1bUl0ZW0oKV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBjdXJyaWN1bHVtOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdGYWlsZWQgdG8gbG9hZCBjdXJyaWN1bHVtLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0Q3VycmljdWx1bUl0ZW1zKFtjcmVhdGVFbXB0eUN1cnJpY3VsdW1JdGVtKCldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmV0Y2hDdXJyaWN1bHVtKCk7XG4gICAgfSwgW3JlY29yZC5pZF0pO1xuICAgIGNvbnN0IGNyZWF0ZUVtcHR5Q3VycmljdWx1bUl0ZW0gPSAoKSA9PiAoe1xuICAgICAgICBuYW1lX2VuOiAnJyxcbiAgICAgICAgbmFtZV9hcjogJycsXG4gICAgICAgIGRlc2NyaXB0aW9uX2VuOiAnJyxcbiAgICAgICAgZGVzY3JpcHRpb25fYXI6ICcnLFxuICAgIH0pO1xuICAgIGNvbnN0IGFkZEN1cnJpY3VsdW1JdGVtID0gKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBuZXdJdGVtcyA9IFsuLi5jdXJyaWN1bHVtSXRlbXMsIGNyZWF0ZUVtcHR5Q3VycmljdWx1bUl0ZW0oKV07XG4gICAgICAgIHNldEN1cnJpY3VsdW1JdGVtcyhuZXdJdGVtcyk7XG4gICAgICAgIHVwZGF0ZVJlY29yZFZhbHVlKG5ld0l0ZW1zKTtcbiAgICAgICAgc2V0RXhwYW5kZWRJbmRleChuZXdJdGVtcy5sZW5ndGggLSAxKTtcbiAgICB9O1xuICAgIGNvbnN0IHJlbW92ZUN1cnJpY3VsdW1JdGVtID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLmN1cnJpY3VsdW1JdGVtc107XG4gICAgICAgIG5ld0l0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHNldEN1cnJpY3VsdW1JdGVtcyhuZXdJdGVtcyk7XG4gICAgICAgIHVwZGF0ZVJlY29yZFZhbHVlKG5ld0l0ZW1zKTtcbiAgICAgICAgc2V0RXhwYW5kZWRJbmRleChudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUN1cnJpY3VsdW1DaGFuZ2UgPSAoaW5kZXgsIGZpZWxkLCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtcyA9IFsuLi5jdXJyaWN1bHVtSXRlbXNdO1xuICAgICAgICBuZXdJdGVtc1tpbmRleF0gPSB7IC4uLm5ld0l0ZW1zW2luZGV4XSwgW2ZpZWxkXTogdmFsdWUgfTtcbiAgICAgICAgc2V0Q3VycmljdWx1bUl0ZW1zKG5ld0l0ZW1zKTtcbiAgICAgICAgdXBkYXRlUmVjb3JkVmFsdWUobmV3SXRlbXMpO1xuICAgIH07XG4gICAgY29uc3QgbW92ZUN1cnJpY3VsdW1JdGVtID0gKGluZGV4LCBkaXJlY3Rpb24pID0+IHtcbiAgICAgICAgaWYgKChkaXJlY3Rpb24gPT09ICd1cCcgJiYgaW5kZXggPT09IDApIHx8IChkaXJlY3Rpb24gPT09ICdkb3duJyAmJiBpbmRleCA9PT0gY3VycmljdWx1bUl0ZW1zLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3SXRlbXMgPSBbLi4uY3VycmljdWx1bUl0ZW1zXTtcbiAgICAgICAgY29uc3QgbmV3SW5kZXggPSBkaXJlY3Rpb24gPT09ICd1cCcgPyBpbmRleCAtIDEgOiBpbmRleCArIDE7XG4gICAgICAgIFtuZXdJdGVtc1tpbmRleF0sIG5ld0l0ZW1zW25ld0luZGV4XV0gPSBbbmV3SXRlbXNbbmV3SW5kZXhdLCBuZXdJdGVtc1tpbmRleF1dO1xuICAgICAgICBzZXRDdXJyaWN1bHVtSXRlbXMobmV3SXRlbXMpO1xuICAgICAgICB1cGRhdGVSZWNvcmRWYWx1ZShuZXdJdGVtcyk7XG4gICAgICAgIHNldEV4cGFuZGVkSW5kZXgobmV3SW5kZXgpO1xuICAgIH07XG4gICAgY29uc3QgdXBkYXRlUmVjb3JkVmFsdWUgPSAodXBkYXRlZEl0ZW1zKSA9PiB7XG4gICAgICAgIG9uQ2hhbmdlKCdjdXJyaWN1bHVtJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZEl0ZW1zKSk7XG4gICAgfTtcbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgY3VycmljdWx1bS4uLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZTogeyBtYXJnaW5Cb3R0b206ICc0NHB4JyB9IH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1iOiBcInhsXCIsIHBiOiBcIm1kXCIsIHN0eWxlOiB7IGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZWFlYWVhJyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sIFwiQ291cnNlIEN1cnJpY3VsdW1cIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgdmFyaWFudDogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIk1hbmFnZSB0aGUgY3VycmljdWx1bSBpdGVtcyBmb3IgdGhpcyBjb3Vyc2VcIikpLFxuICAgICAgICBjdXJyaWN1bHVtSXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNFeHBhbmRlZCA9IGV4cGFuZGVkSW5kZXggPT09IGluZGV4O1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBrZXk6IGl0ZW0uaWQgfHwgaW5kZXgsIG1iOiBcImxnXCIsIHA6IFwibGdcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkZGQnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNnB4IHJnYmEoMCwwLDAsMC4wNSknLFxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICFpc0V4cGFuZGVkID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxuICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0V4cGFuZGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RXhwYW5kZWRJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICFpc0V4cGFuZGVkICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiwgZm9udFNpemU6IFwibWRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkN1cnJpY3VsdW0gSXRlbSAjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjogXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm5hbWVfZW4gfHwgJ1VudGl0bGVkJyksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyB2YXJpYW50OiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiQ2xpY2sgdG8gZXhwYW5kXCIpKSksXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgbWI6IFwibGdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBmb250U2l6ZTogXCJsZ1wiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkN1cnJpY3VsdW0gSXRlbSAjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwidGV4dFwiLCBzaXplOiBcImljb25cIiwgbXI6IFwiZGVmYXVsdFwiLCBkaXNhYmxlZDogaW5kZXggPT09IDAsIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUN1cnJpY3VsdW1JdGVtKGluZGV4LCAndXAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBcIlxcdTIxOTFcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdHlwZTogXCJidXR0b25cIiwgdmFyaWFudDogXCJ0ZXh0XCIsIHNpemU6IFwiaWNvblwiLCBtcjogXCJkZWZhdWx0XCIsIGRpc2FibGVkOiBpbmRleCA9PT0gY3VycmljdWx1bUl0ZW1zLmxlbmd0aCAtIDEsIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUN1cnJpY3VsdW1JdGVtKGluZGV4LCAnZG93bicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIFwiXFx1MjE5M1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyB2YXJpYW50OiBcImRhbmdlclwiLCBzaXplOiBcImljb25cIiwgb25DbGljazogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDdXJyaWN1bHVtSXRlbShpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgXCJYXCIpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1iOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIFwiTmFtZSAoRW5nbGlzaCkqXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGl0ZW0ubmFtZV9lbiwgd2lkdGg6IFwiMTAwJVwiLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUN1cnJpY3VsdW1DaGFuZ2UoaW5kZXgsICduYW1lX2VuJywgZS50YXJnZXQudmFsdWUpLCByZXF1aXJlZDogdHJ1ZSB9KSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1iOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIFwiTmFtZSAoQXJhYmljKSpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogaXRlbS5uYW1lX2FyLCB3aWR0aDogXCIxMDAlXCIsIG9uQ2hhbmdlOiAoZSkgPT4gaGFuZGxlQ3VycmljdWx1bUNoYW5nZShpbmRleCwgJ25hbWVfYXInLCBlLnRhcmdldC52YWx1ZSksIHJlcXVpcmVkOiB0cnVlIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWI6IFwibGdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgXCJEZXNjcmlwdGlvbiAoRW5nbGlzaCkqXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwgeyB2YWx1ZTogaXRlbS5kZXNjcmlwdGlvbl9lbiwgd2lkdGg6IFwiMTAwJVwiLCByb3dzOiAzLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUN1cnJpY3VsdW1DaGFuZ2UoaW5kZXgsICdkZXNjcmlwdGlvbl9lbicsIGUudGFyZ2V0LnZhbHVlKSwgcmVxdWlyZWQ6IHRydWUgfSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIFwiRGVzY3JpcHRpb24gKEFyYWJpYykqXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwgeyB2YWx1ZTogaXRlbS5kZXNjcmlwdGlvbl9hciwgd2lkdGg6IFwiMTAwJVwiLCByb3dzOiAzLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUN1cnJpY3VsdW1DaGFuZ2UoaW5kZXgsICdkZXNjcmlwdGlvbl9hcicsIGUudGFyZ2V0LnZhbHVlKSwgcmVxdWlyZWQ6IHRydWUgfSkpKSkpKTtcbiAgICAgICAgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHRleHRBbGlnbjogXCJjZW50ZXJcIiwgbXQ6IFwieGxcIiwgbWI6IFwieGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogYWRkQ3VycmljdWx1bUl0ZW0sIHZhcmlhbnQ6IFwicHJpbWFyeVwiIH0sIFwiKyBBZGQgQ3VycmljdWx1bSBJdGVtXCIpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEN1cnJpY3VsdW1NYW5hZ2VyO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMYWJlbCwgQm94LCBCdXR0b24sIFRleHQsIElucHV0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmNvbnN0IENhdGVnb3J5U2VsZWN0b3IgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHJlY29yZCwgb25DaGFuZ2UgfSA9IHByb3BzO1xuICAgIGNvbnN0IFthdmFpbGFibGVDYXRlZ29yaWVzLCBzZXRBdmFpbGFibGVDYXRlZ29yaWVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbc2VsZWN0ZWRDYXRlZ29yeUlkcywgc2V0U2VsZWN0ZWRDYXRlZ29yeUlkc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW3NlYXJjaFRlcm0sIHNldFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hBbGxDYXRlZ29yaWVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiAnY291cnNlcycsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdnZXRBbGxDYXRlZ29yaWVzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLmNhdGVnb3JpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0QXZhaWxhYmxlQ2F0ZWdvcmllcyhyZXNwb25zZS5kYXRhLmNhdGVnb3JpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhdGVnb3JpZXM6JywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHNldEF2YWlsYWJsZUNhdGVnb3JpZXMoW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZldGNoQWxsQ2F0ZWdvcmllcygpO1xuICAgIH0sIFtdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaFNlbGVjdGVkQ2F0ZWdvcmllcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmIChyZWNvcmQuaWQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZWNvcmRBY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogJ2NvdXJzZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkSWQ6IHJlY29yZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdnZXRDYXRlZ29yaWVzJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEuY2F0ZWdvcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnlJZHMgPSByZXNwb25zZS5kYXRhLmNhdGVnb3JpZXMubWFwKChjYXQpID0+IGNhdC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENhdGVnb3J5SWRzKGNhdGVnb3J5SWRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc2VsZWN0ZWQgY2F0ZWdvcmllczonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAocmVjb3JkLmlkKSB7XG4gICAgICAgICAgICBmZXRjaFNlbGVjdGVkQ2F0ZWdvcmllcygpO1xuICAgICAgICB9XG4gICAgfSwgW3JlY29yZC5pZF0pO1xuICAgIGNvbnN0IGhhbmRsZUNhdGVnb3J5VG9nZ2xlID0gKGNhdGVnb3J5SWQpID0+IHtcbiAgICAgICAgY29uc3QgbmV3U2VsZWN0ZWRJZHMgPSBzZWxlY3RlZENhdGVnb3J5SWRzLmluY2x1ZGVzKGNhdGVnb3J5SWQpXG4gICAgICAgICAgICA/IHNlbGVjdGVkQ2F0ZWdvcnlJZHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGNhdGVnb3J5SWQpXG4gICAgICAgICAgICA6IFsuLi5zZWxlY3RlZENhdGVnb3J5SWRzLCBjYXRlZ29yeUlkXTtcbiAgICAgICAgc2V0U2VsZWN0ZWRDYXRlZ29yeUlkcyhuZXdTZWxlY3RlZElkcyk7XG4gICAgICAgIHVwZGF0ZVJlY29yZFZhbHVlKG5ld1NlbGVjdGVkSWRzKTtcbiAgICB9O1xuICAgIGNvbnN0IHVwZGF0ZVJlY29yZFZhbHVlID0gKGNhdGVnb3J5SWRzKSA9PiB7XG4gICAgICAgIG9uQ2hhbmdlKCdjYXRlZ29yaWVzJywgSlNPTi5zdHJpbmdpZnkoY2F0ZWdvcnlJZHMpKTtcbiAgICB9O1xuICAgIGNvbnN0IGZpbHRlcmVkQ2F0ZWdvcmllcyA9IGF2YWlsYWJsZUNhdGVnb3JpZXMuZmlsdGVyKChjYXRlZ29yeSkgPT4gY2F0ZWdvcnkubmFtZV9lbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgY2F0ZWdvcnkubmFtZV9hci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkpO1xuICAgIGNvbnN0IHNlbGVjdGVkQ2F0ZWdvcmllcyA9IGF2YWlsYWJsZUNhdGVnb3JpZXMuZmlsdGVyKChjYXQpID0+IHNlbGVjdGVkQ2F0ZWdvcnlJZHMuaW5jbHVkZXMoY2F0LmlkKSk7XG4gICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJMb2FkaW5nIGNhdGVnb3JpZXMuLi5cIik7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgc3R5bGU6IHsgbWFyZ2luQm90dG9tOiAnNDRweCcgfSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYjogXCJ4bFwiLCBwYjogXCJtZFwiLCBzdHlsZTogeyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2VhZWFlYScgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJncmV5ODBcIiB9LCBcIkNvdXJzZSBDYXRlZ29yaWVzXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IHZhcmlhbnQ6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJTZWxlY3QgY2F0ZWdvcmllcyBmb3IgdGhpcyBjb3Vyc2VcIikpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYjogXCJsZ1wiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IHBsYWNlaG9sZGVyOiBcIlNlYXJjaCBjYXRlZ29yaWVzLi4uXCIsIHZhbHVlOiBzZWFyY2hUZXJtLCBvbkNoYW5nZTogKGUpID0+IHNldFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzQwMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDEycHgnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2NjYycsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCcsXG4gICAgICAgICAgICAgICAgICAgIG91dGxpbmU6ICdub25lJyxcbiAgICAgICAgICAgICAgICB9IH0pKSxcbiAgICAgICAgc2VsZWN0ZWRDYXRlZ29yaWVzLmxlbmd0aCA+IDAgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1iOiBcImxnXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIHsgdmFyaWFudDogXCJzbVwiIH0sXG4gICAgICAgICAgICAgICAgXCJTZWxlY3RlZCAoXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXRlZ29yaWVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBcIilcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleFdyYXA6IFwid3JhcFwiLCBnYXA6IFwiOHB4XCIsIG10OiBcInNtXCIgfSwgc2VsZWN0ZWRDYXRlZ29yaWVzLm1hcCgoY2F0ZWdvcnkpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBrZXk6IGNhdGVnb3J5LmlkLCBiZzogXCJwcmltYXJ5MjBcIiwgcHg6IFwiMTJweFwiLCBweTogXCI2cHhcIiwgYm9yZGVyUmFkaXVzOiBcIjE2cHhcIiwgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICdmaXQtY29udGVudCcsXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBtcjogXCI4cHhcIiwgdmFyaWFudDogXCJzbVwiIH0sIGNhdGVnb3J5Lm5hbWVfZW4pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHNpemU6IFwiaWNvblwiLCB2YXJpYW50OiBcInRleHRcIiwgb25DbGljazogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDYXRlZ29yeVRvZ2dsZShjYXRlZ29yeS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzE4cHgnLFxuICAgICAgICAgICAgICAgICAgICB9IH0sIFwiXFx1MDBEN1wiKSkpKSkpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IHZhcmlhbnQ6IFwic21cIiB9LFxuICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcmllcyAoXCIsXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRDYXRlZ29yaWVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBcIilcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtdDogXCJzbVwiLCBtYjogXCJsZ1wiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2VlZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzMwMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgfSB9LCBmaWx0ZXJlZENhdGVnb3JpZXMubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHA6IFwibGdcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiTm8gY2F0ZWdvcmllcyBmb3VuZFwiKSkpIDogKGZpbHRlcmVkQ2F0ZWdvcmllcy5tYXAoKGNhdGVnb3J5KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsga2V5OiBjYXRlZ29yeS5pZCwgcDogXCIxOHB4XCIsIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgI2Y1ZjVmNVwiLCBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGVjdGVkQ2F0ZWdvcnlJZHMuaW5jbHVkZXMoY2F0ZWdvcnkuaWQpID8gJyNmMGY3ZmYnIDogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgICAgfSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2F0ZWdvcnlUb2dnbGUoY2F0ZWdvcnkuaWQpIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IHZhcmlhbnQ6IFwic21cIiB9LFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeS5uYW1lX2VuLFxuICAgICAgICAgICAgICAgICAgICBcIiAvIFwiLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeS5uYW1lX2FyKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnM3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxlY3RlZENhdGVnb3J5SWRzLmluY2x1ZGVzKGNhdGVnb3J5LmlkKSA/ICcjMDA3YmZmJyA6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIH0gfSwgc2VsZWN0ZWRDYXRlZ29yeUlkcy5pbmNsdWRlcyhjYXRlZ29yeS5pZCkgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJ3aGl0ZVwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgZm9udFNpemU6IFwiMTBweFwiIH0sIFwiXFx1MjcxM1wiKSkpKSkpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcnlTZWxlY3RvcjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGFiZWwsIEJveCwgQnV0dG9uLCBUZXh0LCBJbnB1dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5jb25zdCBDb3Vyc2VUcmFpbmVyc01hbmFnZXIgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHJlY29yZCwgb25DaGFuZ2UgfSA9IHByb3BzO1xuICAgIGNvbnN0IFthdmFpbGFibGVUcmFpbmVycywgc2V0QXZhaWxhYmxlVHJhaW5lcnNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtzZWxlY3RlZFRyYWluZXJJZHMsIHNldFNlbGVjdGVkVHJhaW5lcklkc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW3NlYXJjaFRlcm0sIHNldFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hBbGxUcmFpbmVycyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogJ2NvdXJzZXMnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnZ2V0QWxsVHJhaW5lcnMnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEudHJhaW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0QXZhaWxhYmxlVHJhaW5lcnMocmVzcG9uc2UuZGF0YS50cmFpbmVycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRBdmFpbGFibGVUcmFpbmVycyhbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgYWxsIHRyYWluZXJzOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ0ZhaWxlZCB0byBsb2FkIHRyYWluZXJzLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZldGNoQWxsVHJhaW5lcnMoKTtcbiAgICB9LCBbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hTZWxlY3RlZFRyYWluZXJzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlY29yZC5pZCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlY29yZEFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiAnY291cnNlcycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRJZDogcmVjb3JkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ2dldENvdXJzZVRyYWluZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEudHJhaW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWluZXJJZHMgPSByZXNwb25zZS5kYXRhLnRyYWluZXJzLm1hcCgodHJhaW5lcikgPT4gdHJhaW5lci5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZFRyYWluZXJJZHModHJhaW5lcklkcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHNlbGVjdGVkIHRyYWluZXJzOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChyZWNvcmQuaWQpIHtcbiAgICAgICAgICAgIGZldGNoU2VsZWN0ZWRUcmFpbmVycygpO1xuICAgICAgICB9XG4gICAgfSwgW3JlY29yZC5pZF0pO1xuICAgIGNvbnN0IGhhbmRsZVRyYWluZXJUb2dnbGUgPSAodHJhaW5lcklkKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NlbGVjdGVkSWRzID0gc2VsZWN0ZWRUcmFpbmVySWRzLmluY2x1ZGVzKHRyYWluZXJJZClcbiAgICAgICAgICAgID8gc2VsZWN0ZWRUcmFpbmVySWRzLmZpbHRlcigoaWQpID0+IGlkICE9PSB0cmFpbmVySWQpXG4gICAgICAgICAgICA6IFsuLi5zZWxlY3RlZFRyYWluZXJJZHMsIHRyYWluZXJJZF07XG4gICAgICAgIHNldFNlbGVjdGVkVHJhaW5lcklkcyhuZXdTZWxlY3RlZElkcyk7XG4gICAgICAgIHVwZGF0ZVJlY29yZFZhbHVlKG5ld1NlbGVjdGVkSWRzKTtcbiAgICB9O1xuICAgIGNvbnN0IHVwZGF0ZVJlY29yZFZhbHVlID0gKHRyYWluZXJJZHMpID0+IHtcbiAgICAgICAgb25DaGFuZ2UoJ3RyYWluZXJzJywgSlNPTi5zdHJpbmdpZnkodHJhaW5lcklkcykpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlVHJhaW5lciA9ICh0cmFpbmVySWQpID0+IHtcbiAgICAgICAgY29uc3QgbmV3U2VsZWN0ZWRJZHMgPSBzZWxlY3RlZFRyYWluZXJJZHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IHRyYWluZXJJZCk7XG4gICAgICAgIHNldFNlbGVjdGVkVHJhaW5lcklkcyhuZXdTZWxlY3RlZElkcyk7XG4gICAgICAgIHVwZGF0ZVJlY29yZFZhbHVlKG5ld1NlbGVjdGVkSWRzKTtcbiAgICB9O1xuICAgIGNvbnN0IGZpbHRlcmVkVHJhaW5lcnMgPSBhdmFpbGFibGVUcmFpbmVycy5maWx0ZXIoKHRyYWluZXIpID0+IHRyYWluZXIubmFtZV9lbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgdHJhaW5lci5uYW1lX2FyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICB0cmFpbmVyLnRpdGxlX2VuLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICB0cmFpbmVyLnRpdGxlX2FyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgY29uc3Qgc2VsZWN0ZWRUcmFpbmVycyA9IGF2YWlsYWJsZVRyYWluZXJzLmZpbHRlcigodHJhaW5lcikgPT4gc2VsZWN0ZWRUcmFpbmVySWRzLmluY2x1ZGVzKHRyYWluZXIuaWQpKTtcbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgdHJhaW5lcnMuLi5cIik7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgc3R5bGU6IHsgbWFyZ2luQm90dG9tOiAnNDRweCcgfSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYjogXCJ4bFwiLCBwYjogXCJtZFwiLCBzdHlsZTogeyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2VhZWFlYScgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJncmV5ODBcIiB9LCBcIkNvdXJzZSBUcmFpbmVyc1wiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyB2YXJpYW50OiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiU2VsZWN0IG9uZSBvciBtb3JlIHRyYWluZXJzIGZvciB0aGlzIGNvdXJzZVwiKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1iOiBcImxnXCIsIHA6IFwibWRcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IHZhcmlhbnQ6IFwic21cIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIiwgbnVsbCwgYXZhaWxhYmxlVHJhaW5lcnMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICBcIiB0cmFpbmVycyBhdmFpbGFibGVcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgdmFyaWFudDogXCJzbVwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInN0cm9uZ1wiLCBudWxsLCBzZWxlY3RlZFRyYWluZXJJZHMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICBcIiBzZWxlY3RlZFwiKSksXG4gICAgICAgIHNlbGVjdGVkVHJhaW5lcnMubGVuZ3RoID4gMCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWI6IFwibGdcIiwgcDogXCJtZFwiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY5ZmEnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlOWVjZWYnLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgeyBtYjogXCJzbVwiLCBzdHlsZTogeyBmb250U2l6ZTogJzEzcHgnIH0gfSxcbiAgICAgICAgICAgICAgICBcIlNlbGVjdGVkIFRyYWluZXJzIChcIixcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRyYWluZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBcIilcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIGdhcDogJzZweCcgfSB9LCBzZWxlY3RlZFRyYWluZXJzLm1hcCgodHJhaW5lcikgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGtleTogdHJhaW5lci5pZCwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzY3ZDFlN2ZmJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzE0cHgnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZ2FwOiAnNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzNweCA4cHggM3B4IDVweCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuMixcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2JhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlJyxcbiAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgdHJhaW5lci50cmFpbmVyX3BpY3R1cmUgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHRyYWluZXIudHJhaW5lcl9waWN0dXJlLCBhbHQ6IHRyYWluZXIubmFtZV9lbiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RGaXQ6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgIH0gfSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHsgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG1heFdpZHRoOiAnMTIwcHgnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyB9IH0sIHRyYWluZXIubmFtZV9lbiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgc2l6ZTogXCJpY29uXCIsIHZhcmlhbnQ6IFwidGV4dFwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVSZW1vdmVUcmFpbmVyKHRyYWluZXIuaWQpLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzE4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMThweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuMiknLFxuICAgICAgICAgICAgICAgICAgICB9LCBvbk1vdXNlT3ZlcjogKGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC4zNSknKSwgb25Nb3VzZU91dDogKGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC4yKScpIH0sIFwiXFx1MDBEN1wiKSkpKSkpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWI6IFwibGdcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgXCJTZWFyY2ggVHJhaW5lcnNcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogc2VhcmNoVGVybSwgd2lkdGg6IFwiMTAwJVwiLCBvbkNoYW5nZTogKGUpID0+IHNldFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggYnkgbmFtZSBvciB0aXRsZS4uLlwiIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWI6IFwibGdcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgeyBtYjogXCJtZFwiIH0sXG4gICAgICAgICAgICAgICAgXCJBdmFpbGFibGUgVHJhaW5lcnMgXCIsXG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybSAmJiBgKCR7ZmlsdGVyZWRUcmFpbmVycy5sZW5ndGh9IGZvdW5kKWApLFxuICAgICAgICAgICAgZmlsdGVyZWRUcmFpbmVycy5sZW5ndGggPT09IDAgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcDogXCJ4bFwiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM2NjYnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IHZhcmlhbnQ6IFwibGdcIiwgY29sb3I6IFwiZ3JleTYwXCIgfSwgc2VhcmNoVGVybSA/ICdObyB0cmFpbmVycyBtYXRjaCB5b3VyIHNlYXJjaCcgOiAnTm8gdHJhaW5lcnMgYXZhaWxhYmxlJyksXG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybSAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIG10OiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IHNldFNlYXJjaFRlcm0oJycpIH0sIFwiQ2xlYXIgc2VhcmNoXCIpKSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdCgzLCAxZnIpJyxcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRlbXBsYXRlUm93czogJ3JlcGVhdCgyLCBhdXRvKScsXG4gICAgICAgICAgICAgICAgICAgIGdhcDogJzE2cHgnLFxuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6ICczMDBweCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZhZmFmYScsXG4gICAgICAgICAgICAgICAgfSB9LCBmaWx0ZXJlZFRyYWluZXJzLm1hcCgodHJhaW5lcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZFRyYWluZXJJZHMuaW5jbHVkZXModHJhaW5lci5pZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBrZXk6IHRyYWluZXIuaWQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogJzE2cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBpc1NlbGVjdGVkID8gJzJweCBzb2xpZCAjNjdkMWU3ZmYnIDogJzFweCBzb2xpZCAjZGRkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGlzU2VsZWN0ZWQgPyAnI2YwZjhmMCcgOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgMC4zcyBlYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDhweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzIycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6ICgpID0+IGhhbmRsZVRyYWluZXJUb2dnbGUodHJhaW5lci5pZCkgfSxcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICctOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogJy04cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyM2N2QxZTdmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzI0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sIFwiXFx1MjcxM1wiKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICc0OHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc0OHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNlOWVjZWYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhTaHJpbms6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sIHRyYWluZXIudHJhaW5lcl9waWN0dXJlID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHRyYWluZXIudHJhaW5lcl9waWN0dXJlLCBhbHQ6IHRyYWluZXIubmFtZV9lbiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdEZpdDogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJsZ1wiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlxcdUQ4M0RcXHVEQzY0XCIpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHN0eWxlOiB7IGZsZXg6IDEsIG1pbldpZHRoOiAwIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJtZFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgbWI6IFwieHhzXCIsIHN0eWxlOiB7IHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyB9IH0sIHRyYWluZXIubmFtZV9lbiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIsIG1iOiBcInh4c1wiLCBzdHlsZTogeyB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfSB9LCB0cmFpbmVyLm5hbWVfYXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBzdHlsZTogeyB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWluZXIudGl0bGVfZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgLyBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFpbmVyLnRpdGxlX2FyKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogaXNTZWxlY3RlZCA/ICdvdXRsaW5lZCcgOiAncHJpbWFyeScsIHN0eWxlOiB7IGZvbnRTaXplOiAnMTJweCcsIHBhZGRpbmc6ICc2cHggMTZweCcsIGZsZXhTaHJpbms6IDAgfSB9LCBpc1NlbGVjdGVkID8gJ1NlbGVjdGVkJyA6ICdTZWxlY3QnKSkpO1xuICAgICAgICAgICAgfSkpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG10OiBcInhsXCIsIHB0OiBcImxnXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgYm9yZGVyVG9wOiAnMXB4IHNvbGlkICNlZWUnLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgdmFyaWFudDogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBzZWxlY3RlZFRyYWluZXJJZHMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgID8gYFlvdSBoYXZlIHNlbGVjdGVkICR7c2VsZWN0ZWRUcmFpbmVySWRzLmxlbmd0aH0gdHJhaW5lciR7c2VsZWN0ZWRUcmFpbmVySWRzLmxlbmd0aCAhPT0gMSA/ICdzJyA6ICcnfS5gXG4gICAgICAgICAgICAgICAgOiAnTm8gdHJhaW5lcnMgc2VsZWN0ZWQgeWV0LicpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IENvdXJzZVRyYWluZXJzTWFuYWdlcjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgVGV4dCwgSWNvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgSW1hZ2VVcGxvYWRlciA9ICh7IHJlY29yZCwgcHJvcGVydHksIG9uQ2hhbmdlIH0pID0+IHtcbiAgICBjb25zdCBbdXBsb2FkaW5nLCBzZXRVcGxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtwcmV2aWV3VXJsLCBzZXRQcmV2aWV3VXJsXSA9IHVzZVN0YXRlKHJlY29yZC5wYXJhbXM/Lltwcm9wZXJ0eS5uYW1lXSB8fCAnJyk7XG4gICAgY29uc3QgW2lzRHJhZ2dpbmcsIHNldElzRHJhZ2dpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHZhbGlkVHlwZXMgPSBbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvanBnJywgJ2ltYWdlL3BuZycsICdpbWFnZS93ZWJwJ107XG4gICAgY29uc3QgaGFuZGxlRmlsZUNoYW5nZSA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlcz8uWzBdO1xuICAgICAgICBpZiAoIWZpbGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICghdmFsaWRUeXBlcy5pbmNsdWRlcyhmaWxlLnR5cGUpKSB7XG4gICAgICAgICAgICBzZXRFcnJvcign4p2MIE9ubHkgSlBFRywgUE5HLCBhbmQgV2ViUCBpbWFnZXMgYXJlIGFsbG93ZWQuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUgKiAxMDI0ICogMTAyNCkge1xuICAgICAgICAgICAgc2V0RXJyb3IoJ+KdjCBJbWFnZSBtdXN0IGJlIGxlc3MgdGhhbiA1TUIuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0VXBsb2FkaW5nKHRydWUpO1xuICAgICAgICBzZXRFcnJvcignJyk7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS91cGxvYWQvaW1hZ2UnLCB7IG1ldGhvZDogJ1BPU1QnLCBib2R5OiBmb3JtRGF0YSB9KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2sgJiYgZGF0YS51cmwpIHtcbiAgICAgICAgICAgICAgICBzZXRQcmV2aWV3VXJsKGRhdGEudXJsKTtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBkYXRhLnVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvciB8fCAnVXBsb2FkIGZhaWxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNldEVycm9yKGVyci5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBsb2FkIGltYWdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRVcGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVSZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIHNldFByZXZpZXdVcmwoJycpO1xuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBudWxsKTtcbiAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZpbGUtdXBsb2FkLSR7cHJvcGVydHkubmFtZX1gKTtcbiAgICAgICAgaWYgKGZpbGVJbnB1dClcbiAgICAgICAgICAgIGZpbGVJbnB1dC52YWx1ZSA9ICcnO1xuICAgIH07XG4gICAgY29uc3QgdHJpZ2dlckZpbGVJbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZpbGUtdXBsb2FkLSR7cHJvcGVydHkubmFtZX1gKTtcbiAgICAgICAgaWYgKGZpbGVJbnB1dClcbiAgICAgICAgICAgIGZpbGVJbnB1dC5jbGljaygpO1xuICAgIH07XG4gICAgY29uc3Qgb25EcmFnT3ZlciA9IHVzZUNhbGxiYWNrKChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2V0SXNEcmFnZ2luZyh0cnVlKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3Qgb25EcmFnTGVhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldElzRHJhZ2dpbmcoZmFsc2UpO1xuICAgIH0sIFtdKTtcbiAgICBjb25zdCBvbkRyb3AgPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNldElzRHJhZ2dpbmcoZmFsc2UpO1xuICAgICAgICBjb25zdCBmaWxlID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgIGlmIChmaWxlICYmIHZhbGlkVHlwZXMuaW5jbHVkZXMoZmlsZS50eXBlKSkge1xuICAgICAgICAgICAgY29uc3QgZmFrZUV2ZW50ID0geyB0YXJnZXQ6IHsgZmlsZXM6IFtmaWxlXSB9IH07XG4gICAgICAgICAgICBoYW5kbGVGaWxlQ2hhbmdlKGZha2VFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRFcnJvcign4p2MIE9ubHkgaW1hZ2UgZmlsZXMgYXJlIGFsbG93ZWQuJyk7XG4gICAgICAgIH1cbiAgICB9LCBbaGFuZGxlRmlsZUNoYW5nZV0pO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWI6IFwieGxcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIG1iOiBcInhzXCIgfSwgJ1BpY3R1cmUnKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IHZhcmlhbnQ6IFwic21cIiwgbWI6IFwibWRcIiwgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJQTkcsIEpQRywgb3IgV2ViUCBcXHUyMDIyIE1heCBzaXplOiA1TUJcIiksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwOiBcIm1kXCIsIG1iOiBcIm1kXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZjVmNScsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmZmNjY2MnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwicmVkXCIgfSwgZXJyb3IpKSksXG4gICAgICAgIHByZXZpZXdVcmwgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1iOiBcIm1kXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDEwcHggcmdiYSgwLDAsMCwwLjE1KScsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjJzIGVhc2UnLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IHNyYzogcHJldmlld1VybCwgYWx0OiBcIlByZXZpZXdcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0OiAnMTUwcHgnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBzaXplOiBcImljb25cIiwgdmFyaWFudDogXCJkYW5nZXJcIiwgb25DbGljazogaGFuZGxlUmVtb3ZlLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICc2cHgnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI2cHgnLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDZweCByZ2JhKDAsMCwwLDAuMiknLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICAgIG1pbldpZHRoOiAndW5zZXQnLFxuICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICd1bnNldCcsXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIlRyYXNoMlwiLCBzaXplOiAxMiB9KSkpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYm9yZGVyOiBgMnB4IGRhc2hlZCAke2lzRHJhZ2dpbmcgPyAnIzAwN2JmZicgOiAnI2NjYyd9YCwgYm9yZGVyUmFkaXVzOiBcInhsXCIsIHA6IFwieGxcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBvbk1vdXNlT3Zlcjogb25EcmFnT3Zlciwgb25Nb3VzZUxlYXZlOiBvbkRyYWdMZWF2ZSwgb25Ecm9wOiBvbkRyb3AsIG9uRHJhZ092ZXI6IG9uRHJhZ092ZXIsIG9uQ2xpY2s6IHRyaWdnZXJGaWxlSW5wdXQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0RyYWdnaW5nID8gJyNmMGY4ZmYnIDogJyNmOWZhZmInLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgMC4ycyBlYXNlJyxcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIlVwbG9hZFwiLCBzaXplOiAzMCB9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBtdDogXCJtZFwiLCB2YXJpYW50OiBcImxnXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogaXNEcmFnZ2luZyA/ICdwcmltYXJ5JyA6ICdncmV5NjAnIH0sIGlzRHJhZ2dpbmcgPyAnRHJvcCB5b3VyIGltYWdlIGhlcmUnIDogJ0RyYWcgJiBkcm9wIG9yIGNsaWNrIHRvIHVwbG9hZCcpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IHZhcmlhbnQ6IFwic21cIiwgbXQ6IFwieHNcIiwgY29sb3I6IFwiZ3JleTUwXCIgfSwgXCJTdXBwb3J0czogSlBFRywgUE5HLCBXZWJQXCIpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgaWQ6IGBmaWxlLXVwbG9hZC0ke3Byb3BlcnR5Lm5hbWV9YCwgdHlwZTogXCJmaWxlXCIsIGFjY2VwdDogXCJpbWFnZS8qXCIsIG9uQ2hhbmdlOiBoYW5kbGVGaWxlQ2hhbmdlLCBzdHlsZTogeyBkaXNwbGF5OiAnbm9uZScgfSB9KSxcbiAgICAgICAgdXBsb2FkaW5nICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtdDogXCJtZFwiLCBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcInNtXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIkxvYWRlclwiLCBzcGluOiB0cnVlIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IHZhcmlhbnQ6IFwic21cIiwgY29sb3I6IFwicHJpbWFyeVwiIH0sIFwiVXBsb2FkaW5nLi4uXCIpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBJbWFnZVVwbG9hZGVyO1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgQ291cnNlT3V0Y29tZXNNYW5hZ2VyIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Db3Vyc2VPdXRjb21lc01hbmFnZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvdXJzZU91dGNvbWVzTWFuYWdlciA9IENvdXJzZU91dGNvbWVzTWFuYWdlclxuaW1wb3J0IEN1cnJpY3VsdW1NYW5hZ2VyIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9DdXJyaWN1bHVtTWFuYWdlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ3VycmljdWx1bU1hbmFnZXIgPSBDdXJyaWN1bHVtTWFuYWdlclxuaW1wb3J0IENhdGVnb3J5U2VsZWN0b3IgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL0NhdGVnb3J5U2VsZWN0b3InXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNhdGVnb3J5U2VsZWN0b3IgPSBDYXRlZ29yeVNlbGVjdG9yXG5pbXBvcnQgQ291cnNlVHJhaW5lcnNNYW5hZ2VyIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Db3Vyc2VUcmFpbmVyc01hbmFnZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvdXJzZVRyYWluZXJzTWFuYWdlciA9IENvdXJzZVRyYWluZXJzTWFuYWdlclxuaW1wb3J0IEltYWdlVXBsb2FkZXIgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlVXBsb2FkZXIgPSBJbWFnZVVwbG9hZGVyIl0sIm5hbWVzIjpbIkNvdXJzZU91dGNvbWVzTWFuYWdlciIsInByb3BzIiwicmVjb3JkIiwib25DaGFuZ2UiLCJvdXRjb21lcyIsInNldE91dGNvbWVzIiwidXNlU3RhdGUiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImV4cGFuZGVkSW5kZXgiLCJzZXRFeHBhbmRlZEluZGV4IiwiYXBpIiwiQXBpQ2xpZW50IiwidXNlRWZmZWN0IiwiZmV0Y2hPdXRjb21lcyIsImlkIiwicmVzcG9uc2UiLCJyZWNvcmRBY3Rpb24iLCJyZXNvdXJjZUlkIiwicmVjb3JkSWQiLCJhY3Rpb25OYW1lIiwiZGF0YSIsImNyZWF0ZUVtcHR5T3V0Y29tZSIsImVycm9yIiwiY29uc29sZSIsIndpbmRvdyIsImFsZXJ0IiwidGl0bGVfZW4iLCJ0aXRsZV9hciIsImRlc2NyaXB0aW9uX2VuIiwiZGVzY3JpcHRpb25fYXIiLCJhZGRPdXRjb21lIiwiZSIsInByZXZlbnREZWZhdWx0IiwibmV3T3V0Y29tZXMiLCJ1cGRhdGVSZWNvcmRWYWx1ZSIsImxlbmd0aCIsInJlbW92ZU91dGNvbWUiLCJpbmRleCIsInNwbGljZSIsImhhbmRsZU91dGNvbWVDaGFuZ2UiLCJmaWVsZCIsInZhbHVlIiwidXBkYXRlZE91dGNvbWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIlRleHQiLCJmb250U2l6ZSIsIkJveCIsInN0eWxlIiwibWFyZ2luQm90dG9tIiwibWIiLCJwYiIsImJvcmRlckJvdHRvbSIsImZvbnRXZWlnaHQiLCJjb2xvciIsInZhcmlhbnQiLCJtYXAiLCJvdXRjb21lIiwiaXNFeHBhbmRlZCIsImtleSIsInAiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3hTaGFkb3ciLCJjdXJzb3IiLCJvbkNsaWNrIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsIkZyYWdtZW50IiwiQnV0dG9uIiwic2l6ZSIsIkxhYmVsIiwiSW5wdXQiLCJ0eXBlIiwid2lkdGgiLCJ0YXJnZXQiLCJyZXF1aXJlZCIsIlRleHRBcmVhIiwicm93cyIsIm10IiwiQ3VycmljdWx1bU1hbmFnZXIiLCJjdXJyaWN1bHVtSXRlbXMiLCJzZXRDdXJyaWN1bHVtSXRlbXMiLCJmZXRjaEN1cnJpY3VsdW0iLCJjdXJyaWN1bHVtIiwiY3JlYXRlRW1wdHlDdXJyaWN1bHVtSXRlbSIsIm5hbWVfZW4iLCJuYW1lX2FyIiwiYWRkQ3VycmljdWx1bUl0ZW0iLCJuZXdJdGVtcyIsInJlbW92ZUN1cnJpY3VsdW1JdGVtIiwiaGFuZGxlQ3VycmljdWx1bUNoYW5nZSIsIm1vdmVDdXJyaWN1bHVtSXRlbSIsImRpcmVjdGlvbiIsIm5ld0luZGV4IiwidXBkYXRlZEl0ZW1zIiwiaXRlbSIsIm1yIiwiZGlzYWJsZWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0ZXh0QWxpZ24iLCJDYXRlZ29yeVNlbGVjdG9yIiwiYXZhaWxhYmxlQ2F0ZWdvcmllcyIsInNldEF2YWlsYWJsZUNhdGVnb3JpZXMiLCJzZWxlY3RlZENhdGVnb3J5SWRzIiwic2V0U2VsZWN0ZWRDYXRlZ29yeUlkcyIsInNlYXJjaFRlcm0iLCJzZXRTZWFyY2hUZXJtIiwiZmV0Y2hBbGxDYXRlZ29yaWVzIiwicmVzb3VyY2VBY3Rpb24iLCJjYXRlZ29yaWVzIiwiZmV0Y2hTZWxlY3RlZENhdGVnb3JpZXMiLCJjYXRlZ29yeUlkcyIsImNhdCIsImhhbmRsZUNhdGVnb3J5VG9nZ2xlIiwiY2F0ZWdvcnlJZCIsIm5ld1NlbGVjdGVkSWRzIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJmaWx0ZXJlZENhdGVnb3JpZXMiLCJjYXRlZ29yeSIsInRvTG93ZXJDYXNlIiwic2VsZWN0ZWRDYXRlZ29yaWVzIiwicGxhY2Vob2xkZXIiLCJtYXhXaWR0aCIsImhlaWdodCIsInBhZGRpbmciLCJvdXRsaW5lIiwiZmxleFdyYXAiLCJnYXAiLCJiZyIsInB4IiwicHkiLCJtaW5XaWR0aCIsIm92ZXJmbG93WSIsIkNvdXJzZVRyYWluZXJzTWFuYWdlciIsImF2YWlsYWJsZVRyYWluZXJzIiwic2V0QXZhaWxhYmxlVHJhaW5lcnMiLCJzZWxlY3RlZFRyYWluZXJJZHMiLCJzZXRTZWxlY3RlZFRyYWluZXJJZHMiLCJmZXRjaEFsbFRyYWluZXJzIiwidHJhaW5lcnMiLCJmZXRjaFNlbGVjdGVkVHJhaW5lcnMiLCJ0cmFpbmVySWRzIiwidHJhaW5lciIsImhhbmRsZVRyYWluZXJUb2dnbGUiLCJ0cmFpbmVySWQiLCJoYW5kbGVSZW1vdmVUcmFpbmVyIiwiZmlsdGVyZWRUcmFpbmVycyIsInNlbGVjdGVkVHJhaW5lcnMiLCJsaW5lSGVpZ2h0IiwidHJhbnNpdGlvbiIsInRyYWluZXJfcGljdHVyZSIsInNyYyIsImFsdCIsIm9iamVjdEZpdCIsIndoaXRlU3BhY2UiLCJvdmVyZmxvdyIsInRleHRPdmVyZmxvdyIsIm9uTW91c2VPdmVyIiwiY3VycmVudFRhcmdldCIsIm9uTW91c2VPdXQiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwiZ3JpZFRlbXBsYXRlUm93cyIsIm1heEhlaWdodCIsImlzU2VsZWN0ZWQiLCJwb3NpdGlvbiIsInRvcCIsInJpZ2h0IiwiZmxleFNocmluayIsImZsZXgiLCJwdCIsImJvcmRlclRvcCIsIkltYWdlVXBsb2FkZXIiLCJwcm9wZXJ0eSIsInVwbG9hZGluZyIsInNldFVwbG9hZGluZyIsInNldEVycm9yIiwicHJldmlld1VybCIsInNldFByZXZpZXdVcmwiLCJwYXJhbXMiLCJuYW1lIiwiaXNEcmFnZ2luZyIsInNldElzRHJhZ2dpbmciLCJ2YWxpZFR5cGVzIiwiaGFuZGxlRmlsZUNoYW5nZSIsImZpbGUiLCJmaWxlcyIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJqc29uIiwib2siLCJ1cmwiLCJFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJoYW5kbGVSZW1vdmUiLCJmaWxlSW5wdXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidHJpZ2dlckZpbGVJbnB1dCIsImNsaWNrIiwib25EcmFnT3ZlciIsInVzZUNhbGxiYWNrIiwib25EcmFnTGVhdmUiLCJvbkRyb3AiLCJkYXRhVHJhbnNmZXIiLCJmYWtlRXZlbnQiLCJtaW5IZWlnaHQiLCJJY29uIiwiaWNvbiIsIm9uTW91c2VMZWF2ZSIsImFjY2VwdCIsInNwaW4iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQSxNQUFNQSxxQkFBcUIsR0FBSUMsS0FBSyxJQUFLO01BQ3JDLE1BQU07UUFBRUMsTUFBTTtJQUFFQyxJQUFBQTtJQUFTLEdBQUMsR0FBR0YsS0FBSztNQUNsQyxNQUFNLENBQUNHLFFBQVEsRUFBRUMsV0FBVyxDQUFDLEdBQUdDLGNBQVEsQ0FBQyxFQUFFLENBQUM7TUFDNUMsTUFBTSxDQUFDQyxPQUFPLEVBQUVDLFVBQVUsQ0FBQyxHQUFHRixjQUFRLENBQUMsS0FBSyxDQUFDO01BQzdDLE1BQU0sQ0FBQ0csYUFBYSxFQUFFQyxnQkFBZ0IsQ0FBQyxHQUFHSixjQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JELEVBQUEsTUFBTUssR0FBRyxHQUFHLElBQUlDLGlC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
