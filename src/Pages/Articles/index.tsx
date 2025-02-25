import { useState } from 'react';
import { Grid, Container, Pagination, CircularProgress } from '@mui/material';
import { useGetNewsApiQuery } from './newsApi';
import { ArticleCard } from '../../components';
import { ArticleFilter, defaultFilters } from '../../forms/ArticlesFilter';
import { SearchFormValues } from '../../forms/ArticlesFilter/filterSchema';

export const ArticlesPage = () => {
  const [filters, setFilters] = useState<SearchFormValues>(defaultFilters);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, error, isLoading } = useGetNewsApiQuery({ ...filters, page, pageSize });

  const handleFilterSubmit = (values: typeof filters) => {
    setFilters(values);
    setPage(1);
  };

  const totalPages = Math.ceil((data?.totalResults || 1) / pageSize);

  return (
    <Container>
      <ArticleFilter onFilterSubmit={handleFilterSubmit} />

      {isLoading ? (
        <Grid container justifyContent="center" mt={4}>
          <CircularProgress />
        </Grid>
      ) : error ? (
        <p>Error loading articles</p>
      ) : (
        <Grid container spacing={3} mt={4}>
          {data?.articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination Component */}
      <Grid container justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          size="medium"
          color="primary"
        />
      </Grid>
    </Container>
  );
};
