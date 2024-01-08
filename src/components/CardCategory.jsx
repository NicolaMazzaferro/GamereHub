import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function CardCategory({prop}) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={ prop.image_background }
        alt={ prop.slug }
      />

    <Typography variant="h4" textAlign={'center'} p={2}>
      {prop.name}
    </Typography>


    </Card>
  );
}