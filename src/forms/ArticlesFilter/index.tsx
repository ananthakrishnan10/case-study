import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, TextField, Button } from '@mui/material';
import { SearchFormValues, searchSchema } from './filterSchema';
import { ArticleFilterProps } from '../types/filter';

export const defaultFilters = {
  keyword: 'tesla',
  sources: '',
  from: '2025-01-25',
  to: new Date().toISOString().split('T')[0],
};

export const ArticleFilter = ({ onFilterSubmit }: ArticleFilterProps) => {
  const { register, handleSubmit } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: defaultFilters,
  });

  return (
    <form onSubmit={handleSubmit(onFilterSubmit)} className="bg-white p-4 rounded-xl shadow-md ">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField {...register('keyword')} label="Search" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField {...register('sources')} label="Sources" fullWidth size="small" />
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
