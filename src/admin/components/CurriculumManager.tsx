import React, { useState, useEffect } from 'react';
import { Label, Box, Button, Text, Input, TextArea } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

interface CurriculumItem {
  id?: number;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  course_id?: number;
}

const CurriculumManager = (props: any) => {
  const { record, onChange } = props;

  const [curriculumItems, setCurriculumItems] = useState<CurriculumItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const api = new ApiClient();

  useEffect(() => {
    const fetchCurriculum = async () => {
      if (record.id) {
        setLoading(true);
        try {
          const response = await api.recordAction({
            resourceId: 'courses',
            recordId: record.id,
            actionName: 'getCurriculum',
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

  const createEmptyCurriculumItem = (): CurriculumItem => ({
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
  });

  const addCurriculumItem = (e: React.MouseEvent) => {
    e.preventDefault();
    const newItems = [...curriculumItems, createEmptyCurriculumItem()];
    setCurriculumItems(newItems);
    updateRecordValue(newItems);
    setExpandedIndex(newItems.length - 1);
  };

  const removeCurriculumItem = (index: number) => {
    const newItems = [...curriculumItems];
    newItems.splice(index, 1);
    setCurriculumItems(newItems);
    updateRecordValue(newItems);
    setExpandedIndex(null);
  };

  const handleCurriculumChange = (index: number, field: keyof CurriculumItem, value: string) => {
    const newItems = [...curriculumItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setCurriculumItems(newItems);
    updateRecordValue(newItems);
  };

  const moveCurriculumItem = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === curriculumItems.length - 1)) {
      return;
    }

    const newItems = [...curriculumItems];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setCurriculumItems(newItems);
    updateRecordValue(newItems);
    setExpandedIndex(newIndex);
  };

  const updateRecordValue = (updatedItems: CurriculumItem[]) => {
    onChange('curriculum', JSON.stringify(updatedItems));
  };

  if (loading) {
    return <Text>Loading curriculum...</Text>;
  }

  return (
    <Box style={{ marginBottom: '44px' }}>
      <Box mb="xl" pb="md" style={{ borderBottom: '2px solid #eaeaea' }}>
        <Text fontSize="xl" fontWeight="bold" color="grey80">
          Course Curriculum
        </Text>
        <Text variant="sm" color="grey60">
          Manage the curriculum items for this course
        </Text>
      </Box>

      {curriculumItems.map((item, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <Box
            key={item.id || index}
            mb="lg"
            p="lg"
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              cursor: !isExpanded ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (!isExpanded) setExpandedIndex(index);
            }}
          >
            {/* Collapsed view */}
            {!isExpanded && (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold" fontSize="md" color="primary100">
                  Curriculum Item #{index + 1}: {item.name_en || 'Untitled'}
                </Text>
                <Text variant="sm" color="grey60">
                  Click to expand
                </Text>
              </Box>
            )}

            {/* Expanded view */}
            {isExpanded && (
              <>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
                  <Text fontWeight="bold" fontSize="lg" color="primary100">
                    Curriculum Item #{index + 1}
                  </Text>
                  <Box>
                    <Button
                      type="button"
                      variant="text"
                      size="icon"
                      mr="default"
                      disabled={index === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCurriculumItem(index, 'up');
                      }}
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="text"
                      size="icon"
                      mr="default"
                      disabled={index === curriculumItems.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCurriculumItem(index, 'down');
                      }}
                    >
                      ↓
                    </Button>
                    <Button
                      variant="danger"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCurriculumItem(index);
                      }}
                    >
                      X
                    </Button>
                  </Box>
                </Box>

                <Box mb="lg">
                  <Label>Name (English)*</Label>
                  <Input
                    type="text"
                    value={item.name_en}
                    width="100%"
                    onChange={(e) => handleCurriculumChange(index, 'name_en', e.target.value)}
                    required
                  />
                </Box>

                <Box mb="lg">
                  <Label>Name (Arabic)*</Label>
                  <Input
                    type="text"
                    value={item.name_ar}
                    width="100%"
                    onChange={(e) => handleCurriculumChange(index, 'name_ar', e.target.value)}
                    required
                  />
                </Box>

                <Box mb="lg">
                  <Label>Description (English)*</Label>
                  <TextArea
                    value={item.description_en}
                    width="100%"
                    rows={3}
                    onChange={(e) => handleCurriculumChange(index, 'description_en', e.target.value)}
                    required
                  />
                </Box>

                <Box>
                  <Label>Description (Arabic)*</Label>
                  <TextArea
                    value={item.description_ar}
                    width="100%"
                    rows={3}
                    onChange={(e) => handleCurriculumChange(index, 'description_ar', e.target.value)}
                    required
                  />
                </Box>
              </>
            )}
          </Box>
        );
      })}

      <Box textAlign="center" mt="xl" mb="xl">
        <Button type="button" onClick={addCurriculumItem} variant="primary">
          + Add Curriculum Item
        </Button>
      </Box>
    </Box>
  );
};

export default CurriculumManager;
