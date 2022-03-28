// MATERIAL UI
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
// STYLES
import styles from './styles';

const MatchPet = ({ testimonyData, flexVariant }) => {
  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <CardMedia
          component='img'
          height='350'
          image={testimonyData.imageURL}
          alt={'img'}
          sx={styles.cardMedia}
        />
        <CardContent sx={styles.cardContent_testimonyData}>
          <Typography gutterBottom variant='h5' component='div'>
            {`"${testimonyData.petName}" & ${testimonyData.username}`}
          </Typography>
          <Typography variant='body2' color='text.primary'>
            {testimonyData.testimony}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default MatchPet;
