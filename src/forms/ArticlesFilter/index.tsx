import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { SearchFormValues, searchSchema } from './filterSchema';
import { ArticleFilterProps } from '../types/filter';
import { useGetNewsSourcesQuery } from '../../Pages/Articles/apis';

export const defaultFilters = {
  keyword: 'tesla',
  sources: '',
  from: '2025-02-15',
  to: new Date().toISOString().split('T')[0],
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField {...register('keyword')} label="Search" fullWidth size="small" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Sources</InputLabel>
            <Controller
              name="sources"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Sources" disabled={isLoading}>
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

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Category">
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

        <Grid item xs={12} sm={6} md={3}>
          <TextField {...register('from')} type="date" fullWidth size="small" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField {...register('to')} type="date" fullWidth size="small" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
