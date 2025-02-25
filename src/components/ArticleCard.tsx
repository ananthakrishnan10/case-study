import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { ArticleCardProps } from './types/ArticleCard';
import { FC } from 'react';

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 400, // Ensures cards are uniform
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {article.urlToImage && (
        <CardMedia
          component="img"
          sx={{ height: 150, objectFit: 'cover' }} // Fixed height, prevents stretching
          image={article.urlToImage}
          alt={article.title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2, // Restrict title to 2 lines
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3, // Restrict description to 3 lines
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" href={article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};
