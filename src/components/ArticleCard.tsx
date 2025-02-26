import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { ArticleCardProps } from './types/ArticleCard';
import { FC } from 'react';

const DUMMY_IMAGE = '/bg.webp';

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="min-h-[400px] flex flex-col shadow-lg rounded-lg overflow-hidden">
      <CardMedia
        component="img"
        className="h-[150px] object-cover"
        image={article.urlToImage || DUMMY_IMAGE}
        alt={article.title || 'No Image Available'}
      />
      <CardContent className="flex-grow p-4">
        <Typography gutterBottom variant="h6" component="div" className="line-clamp-2 text-lg font-semibold">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="line-clamp-3 text-gray-600">
          {article.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" className="text-xs text-gray-500">
          {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions className="justify-end p-4">
        <Button
          size="small"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};
