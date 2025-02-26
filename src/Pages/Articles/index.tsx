import { useState } from 'react';
import { Container, Grid2 as Grid, Pagination, CircularProgress } from '@mui/material';
import { ArticleCard } from '../../components';
import { ArticleFilter, defaultFilters } from '../../forms/ArticlesFilter';
import { SearchFormValues } from '../../forms/ArticlesFilter/filterSchema';
import { useGetGuardianNewsQuery, useGetNewsApiQuery } from './apis';

export const ArticlesPage = () => {
  const [filters, setFilters] = useState<SearchFormValues>(defaultFilters);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: newsApiData,
    error: newsApiError,
    isLoading: newsApiLoading,
  } = useGetNewsApiQuery({ ...filters, page, pageSize });

  const {
    data: guardianData,
    error: guardianError,
    isLoading: guardianLoading,
  } = useGetGuardianNewsQuery({ ...filters, page, pageSize });

  const handleFilterSubmit = (values: typeof filters) => {
    setFilters(values);
    setPage(1);
  };

  const isLoading = newsApiLoading || guardianLoading;
  const error = newsApiError || guardianError;

  const articles = [
    ...(newsApiData?.articles || []),
    ...(guardianData?.response?.results || []).map((article) => ({
      title: article.webTitle,
      url: article.webUrl,
      source: { name: 'The Guardian' },
      publishedAt: article.webPublicationDate,
      description: '',
      urlToImage: '',
    })),
  ];

  const totalPages = Math.min(
    Math.ceil((newsApiData?.totalResults || 1) / pageSize),
    guardianData?.response?.pages || 1,
  );

  return (
    <Container className="mx-auto px-4 py-6">
      <ArticleFilter onFilterSubmit={handleFilterSubmit} />

      {isLoading ? (
        <div className="flex justify-center mt-6">
          <CircularProgress className="text-blue-500" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center mt-4">Error loading articles</p>
      ) : (
        <Grid container spacing={3} className="my-6">
          {articles.map((article, index) => (
            <Grid size={{ md: 4, sm: 6, xs: 12 }} key={index}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      )}

      <div className="flex justify-center mt-6">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          size="medium"
          color="primary"
        />
      </div>
    </Container>
  );
};
