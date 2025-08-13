import React, { useState, useEffect } from 'react';
import { Label, Box, Button, Text, Input } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

interface Category {
  id: number;
  name_en: string;
  name_ar: string;
}

const CategorySelector = (props: any) => {
  const { record, onChange } = props;

  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const api = new ApiClient();

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const response = await api.resourceAction({
          resourceId: 'courses',
          actionName: 'getAllCategories',
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

  useEffect(() => {
    const fetchSelectedCategories = async () => {
      if (record.id) {
        try {
          const response = await api.recordAction({
            resourceId: 'courses',
            recordId: record.id,
            actionName: 'getCategories',
          });

          if (response.data && response.data.categories) {
            const categoryIds = response.data.categories.map((cat: any) => cat.id);
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

  const handleCategoryToggle = (categoryId: number) => {
    const newSelectedIds = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];

    setSelectedCategoryIds(newSelectedIds);
    updateRecordValue(newSelectedIds);
  };

  const updateRecordValue = (categoryIds: number[]) => {
    onChange('categories', JSON.stringify(categoryIds));
  };

  const filteredCategories = availableCategories.filter(
    (category) =>
      category.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name_ar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCategories = availableCategories.filter((cat) => selectedCategoryIds.includes(cat.id));

  if (loading) {
    return <Text>Loading categories...</Text>;
  }

  return (
    <Box style={{ marginBottom: '44px' }}>
      <Box mb="xl" pb="md" style={{ borderBottom: '2px solid #eaeaea' }}>
        <Text fontSize="xl" fontWeight="bold" color="grey80">
          Course Categories
        </Text>
        <Text variant="sm" color="grey60">
          Select categories for this course
        </Text>
      </Box>

      {/* Search Input */}
      <Box mb="lg">
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '32px',
            padding: '0 12px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
          }}
        />
      </Box>

      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <Box mb="lg">
          <Label variant="sm">Selected ({selectedCategories.length})</Label>
          <Box display="flex" flexWrap="wrap" gap="8px" mt="sm">
            {selectedCategories.map((category) => (
              <Box
                key={category.id}
                bg="primary20"
                px="12px"
                py="6px"
                borderRadius="16px"
                display="flex"
                alignItems="center"
                style={{
                  border: '1px solid #e0e0e0',
                  maxWidth: 'fit-content',
                }}
              >
                <Text mr="8px" variant="sm">
                  {category.name_en}
                </Text>
                <Button
                  size="icon"
                  variant="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryToggle(category.id);
                  }}
                  style={{
                    minWidth: 'auto',
                    padding: '0',
                    width: '18px',
                    height: '18px',
                  }}
                >
                  ×
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Category List with Fixed Height */}
      <Box>
        <Label variant="sm">Categories ({filteredCategories.length})</Label>
        <Box
          mt="sm"
          mb="lg"
          style={{
            border: '1px solid #eee',
            borderRadius: '4px',
            height: '300px',
            overflowY: 'auto',
          }}
        >
          {filteredCategories.length === 0 ? (
            <Box p="lg" textAlign="center">
              <Text color="grey60">No categories found</Text>
            </Box>
          ) : (
            filteredCategories.map((category) => (
              <Box
                key={category.id}
                p="18px"
                borderBottom="1px solid #f5f5f5"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                style={{
                  backgroundColor: selectedCategoryIds.includes(category.id) ? '#f0f7ff' : 'white',
                  cursor: 'pointer',
                }}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <Text variant="sm">
                  {category.name_en} / {category.name_ar}
                </Text>
                <Box
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: selectedCategoryIds.includes(category.id) ? '#007bff' : 'white',
                  }}
                >
                  {selectedCategoryIds.includes(category.id) && (
                    <Text color="white" fontWeight="bold" fontSize="10px">
                      ✓
                    </Text>
                  )}
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CategorySelector;
