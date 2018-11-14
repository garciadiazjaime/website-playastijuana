import LazyLoad from 'react-lazyload'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const openGrpnPage = url => {
  window.open(url, '_blank');
}

export default ({ place }) => (
  <Card>
    <CardMedia
      overlay={<CardTitle title={place.google.name} />}
    >
      <LazyLoad height={200} once>
        <img src={place.google.photos.pop()} alt={place.google.name} />
      </LazyLoad>
    </CardMedia>
    <CardActions>
      <FlatButton label="Leer más" onClick={() => openGrpnPage(place.google.url)} />
    </CardActions>
    <br />
  </Card>
)

