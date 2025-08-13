import React, { useState, useEffect } from 'react';
import { Label, Box, Button, Text, Input } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

interface Trainer {
  id: number;
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  trainer_picture?: string;
}

const CourseTrainersManager = (props: any) => {
  const { record, onChange } = props;

  const [availableTrainers, setAvailableTrainers] = useState<Trainer[]>([]);
  const [selectedTrainerIds, setSelectedTrainerIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const api = new ApiClient();

  useEffect(() => {
    const fetchAllTrainers = async () => {
      setLoading(true);
      try {
        const response = await api.resourceAction({
          resourceId: 'courses',
          actionName: 'getAllTrainers',
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

  useEffect(() => {
    const fetchSelectedTrainers = async () => {
      if (record.id) {
        try {
          const response = await api.recordAction({
            resourceId: 'courses',
            recordId: record.id,
            actionName: 'getCourseTrainers',
          });

          if (response.data && response.data.trainers) {
            const trainerIds = response.data.trainers.map((trainer: any) => trainer.id);
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

  const handleTrainerToggle = (trainerId: number) => {
    const newSelectedIds = selectedTrainerIds.includes(trainerId)
      ? selectedTrainerIds.filter((id) => id !== trainerId)
      : [...selectedTrainerIds, trainerId];

    setSelectedTrainerIds(newSelectedIds);
    updateRecordValue(newSelectedIds);
  };

  const updateRecordValue = (trainerIds: number[]) => {
    onChange('trainers', JSON.stringify(trainerIds));
  };

  const handleRemoveTrainer = (trainerId: number) => {
    const newSelectedIds = selectedTrainerIds.filter((id) => id !== trainerId);
    setSelectedTrainerIds(newSelectedIds);
    updateRecordValue(newSelectedIds);
  };

  const filteredTrainers = availableTrainers.filter(
    (trainer) =>
      trainer.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.title_ar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedTrainers = availableTrainers.filter((trainer) => selectedTrainerIds.includes(trainer.id));

  if (loading) {
    return <Text>Loading trainers...</Text>;
  }

  return (
    <Box style={{ marginBottom: '44px' }}>
      <Box mb="xl" pb="md" style={{ borderBottom: '2px solid #eaeaea' }}>
        <Text fontSize="xl" fontWeight="bold" color="grey80">
          Course Trainers
        </Text>
        <Text variant="sm" color="grey60">
          Select one or more trainers for this course
        </Text>
      </Box>

      {/* Stats Bar */}
      <Box
        mb="lg"
        p="md"
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text variant="sm">
          <strong>{availableTrainers.length}</strong> trainers available
        </Text>
        <Text variant="sm">
          <strong>{selectedTrainerIds.length}</strong> selected
        </Text>
      </Box>

      {/* Selected Trainers */}
      {selectedTrainers.length > 0 && (
        <Box
          mb="lg"
          p="md"
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
          }}
        >
          <Label mb="sm" style={{ fontSize: '13px' }}>
            Selected Trainers ({selectedTrainers.length})
          </Label>
          <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedTrainers.map((trainer) => (
              <Box
                key={trainer.id}
                style={{
                  backgroundColor: '#67d1e7ff',
                  color: 'white',
                  borderRadius: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  padding: '3px 8px 3px 5px',
                  lineHeight: 1.2,
                  transition: 'background-color 0.2s ease',
                }}
              >
                {/* Tiny avatar */}
                {trainer.trainer_picture && (
                  <img
                    src={trainer.trainer_picture}
                    alt={trainer.name_en}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                )}

                {/* Name */}
                <span style={{ whiteSpace: 'nowrap', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {trainer.name_en}
                </span>

                {/* Close button */}
                <Button
                  size="icon"
                  variant="text"
                  onClick={() => handleRemoveTrainer(trainer.id)}
                  style={{
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
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.35)')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
                >
                  ×
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Search Bar */}
      <Box mb="lg">
        <Label>Search Trainers</Label>
        <Input
          type="text"
          value={searchTerm}
          width="100%"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or title..."
        />
      </Box>

      {/* Available Trainers Grid */}
      <Box mb="lg">
        <Label mb="md">Available Trainers {searchTerm && `(${filteredTrainers.length} found)`}</Label>

        {filteredTrainers.length === 0 ? (
          <Box
            p="xl"
            style={{
              textAlign: 'center',
              color: '#666',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
            }}
          >
            <Text variant="lg" color="grey60">
              {searchTerm ? 'No trainers match your search' : 'No trainers available'}
            </Text>
            {searchTerm && (
              <Button variant="text" mt="sm" onClick={() => setSearchTerm('')}>
                Clear search
              </Button>
            )}
          </Box>
        ) : (
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, auto)',
              gap: '16px',
              maxHeight: '300px',
              overflowY: 'auto',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
            }}
          >
            {filteredTrainers.map((trainer) => {
              const isSelected = selectedTrainerIds.includes(trainer.id);
              return (
                <Box
                  key={trainer.id}
                  style={{
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
                    position: 'relative',
                  }}
                  onClick={() => handleTrainerToggle(trainer.id)}
                >
                  {isSelected && (
                    <Box
                      style={{
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
                        fontSize: '14px',
                      }}
                    >
                      ✓
                    </Box>
                  )}

                  {/* Avatar */}
                  <Box
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {trainer.trainer_picture ? (
                      <img
                        src={trainer.trainer_picture}
                        alt={trainer.name_en}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Text fontSize="lg" color="grey60">
                        👤
                      </Text>
                    )}
                  </Box>

                  {/* Trainer Info */}
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      mb="xxs"
                      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {trainer.name_en}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="grey80"
                      mb="xxs"
                      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {trainer.name_ar}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="grey60"
                      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {trainer.title_en} / {trainer.title_ar}
                    </Text>
                  </Box>

                  {/* Select Button */}
                  <Button
                    size="sm"
                    variant={isSelected ? 'outlined' : 'primary'}
                    style={{ fontSize: '12px', padding: '6px 16px', flexShrink: 0 }}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </Button>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {/* Summary */}
      <Box
        mt="xl"
        pt="lg"
        style={{
          borderTop: '1px solid #eee',
          textAlign: 'center',
        }}
      >
        <Text variant="sm" color="grey60">
          {selectedTrainerIds.length > 0
            ? `You have selected ${selectedTrainerIds.length} trainer${selectedTrainerIds.length !== 1 ? 's' : ''}.`
            : 'No trainers selected yet.'}
        </Text>
      </Box>
    </Box>
  );
};

export default CourseTrainersManager;
