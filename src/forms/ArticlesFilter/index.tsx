import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid2 as Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { SearchFormValues, searchSchema } from './filterSchema';
import { ArticleFilterProps } from '../types/filter';
import { useGetNewsSourcesQuery } from '../../Pages/Articles/apis';

export const defaultFilters = {
  keyword: 'tesla',
  sources: '',
  from: '2025-02-15',
  to: new Date().toISOString().split('T')[0],
  author: '',
};

const categoryOptions = [
  { value: 'business', label: 'Business' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'general', label: 'General' },
  { value: 'health', label: 'Health' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sports' },
  { value: 'technology', label: 'Technology' },
];

export const ArticleFilter = ({ onFilterSubmit }: ArticleFilterProps) => {
  const { control, register, handleSubmit } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: defaultFilters,
  });

  const { data: sourcesData, isLoading } = useGetNewsSourcesQuery();

  return (
    <form onSubmit={handleSubmit(onFilterSubmit)} className="bg-white p-4 rounded-xl shadow-md">
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 4, md: 2 }}>
          <TextField {...register('keyword')} label="Search" fullWidth size="small" />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 2 }}>
          <TextField {...register('author')} label="Author" fullWidth size="small" />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Sources</InputLabel>
            <Controller
              name="sources"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Sources"
                  disabled={isLoading}
                  MenuProps={{
                    PaperProps: { style: { maxHeight: 400, overflowY: 'auto' } },
                  }}
                >
                  <MenuItem value="">All Sources</MenuItem>
                  {sourcesData?.sources.map((source) => (
                    <MenuItem key={source.id} value={source.id}>
                      {source.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Category"
                  MenuProps={{
                    PaperProps: { style: { maxHeight: 400, overflowY: 'auto' } },
                  }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categoryOptions.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <TextField {...register('from')} type="date" fullWidth size="small" />
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <TextField {...register('to')} type="date" fullWidth size="small" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 2 }} className="flex sm:justify-end">
          <Button type="submit" variant="contained" color="primary" fullWidth className="sm:w-auto">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
