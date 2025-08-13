import React, { useState, useEffect } from 'react';
import { Label, Box, Button, Text, Input, TextArea } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

interface CourseOutcome {
  id?: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  course_id?: number;
}

const CourseOutcomesManager = (props: any) => {
  const { record, onChange } = props;

  const [outcomes, setOutcomes] = useState<CourseOutcome[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // first open by default
  const api = new ApiClient();

  useEffect(() => {
    const fetchOutcomes = async () => {
      if (record.id) {
        setLoading(true);
        try {
          const response = await api.recordAction({
            resourceId: 'courses',
            recordId: record.id,
            actionName: 'getOutcomes',
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

  const createEmptyOutcome = (): CourseOutcome => ({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
  });

  const addOutcome = (e: React.MouseEvent) => {
    e.preventDefault();
    const newOutcomes = [...outcomes, createEmptyOutcome()];
    setOutcomes(newOutcomes);
    updateRecordValue(newOutcomes);
    setExpandedIndex(newOutcomes.length - 1); // open the new one
  };

  const removeOutcome = (index: number) => {
    const newOutcomes = [...outcomes];
    newOutcomes.splice(index, 1);
    setOutcomes(newOutcomes);
    updateRecordValue(newOutcomes);
    setExpandedIndex(null);
  };

  const handleOutcomeChange = (index: number, field: keyof CourseOutcome, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = { ...newOutcomes[index], [field]: value };
    setOutcomes(newOutcomes);
    updateRecordValue(newOutcomes);
  };

  const updateRecordValue = (updatedOutcomes: CourseOutcome[]) => {
    onChange('outcomes', JSON.stringify(updatedOutcomes));
  };

  if (loading) {
    return <Text fontSize="lg">Loading course outcomes...</Text>;
  }

  return (
    <Box style={{ marginBottom: '44px' }}>
      {/* Header */}
      <Box mb="xl" pb="md" style={{ borderBottom: '2px solid #eaeaea' }}>
        <Text fontSize="xl" fontWeight="bold" color="grey80">
          Course Outcomes
        </Text>
        <Text variant="sm" color="grey60">
          Manage the learning outcomes for this course
        </Text>
      </Box>

      {outcomes.map((outcome, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <Box
            key={outcome.id || index}
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
                  Outcome #{index + 1}: {outcome.title_en || 'Untitled'}
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
                    Outcome #{index + 1}
                  </Text>
                  <Button variant="danger" size="sm" onClick={() => removeOutcome(index)}>
                    Remove
                  </Button>
                </Box>

                <Box mb="lg">
                  <Label>Title (English)*</Label>
                  <Input
                    type="text"
                    value={outcome.title_en}
                    width="100%"
                    onChange={(e) => handleOutcomeChange(index, 'title_en', e.target.value)}
                    required
                  />
                </Box>

                <Box mb="lg">
                  <Label>Title (Arabic)*</Label>
                  <Input
                    type="text"
                    value={outcome.title_ar}
                    width="100%"
                    onChange={(e) => handleOutcomeChange(index, 'title_ar', e.target.value)}
                    required
                  />
                </Box>

                <Box mb="lg">
                  <Label>Description (English)*</Label>
                  <TextArea
                    value={outcome.description_en}
                    width="100%"
                    rows={3}
                    onChange={(e) => handleOutcomeChange(index, 'description_en', e.target.value)}
                    required
                  />
                </Box>

                <Box>
                  <Label>Description (Arabic)*</Label>
                  <TextArea
                    value={outcome.description_ar}
                    width="100%"
                    rows={3}
                    onChange={(e) => handleOutcomeChange(index, 'description_ar', e.target.value)}
                    required
                  />
                </Box>
              </>
            )}
          </Box>
        );
      })}

      {/* Add button */}
      <Box mt="lg" mb="xl">
        <Button type="button" onClick={addOutcome} variant="primary">
          + Add New Outcome
        </Button>
      </Box>
    </Box>
  );
};

export default CourseOutcomesManager;
