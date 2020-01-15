import Dev from '../models/Dev';
import parseStringAsArray from '../../utils/parseStringAsArray';

class SearchUserController {
  async index(req, res) {
    try {
      const { techs, latitude, longitude } = req.query;

      const techsArray = parseStringAsArray(techs);

      const dev = await Dev.find({
        techs: {
          $in: techsArray,
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: 10000,
          },
        },
      });
      return res.send(dev);
    } catch (error) {
      return res.send(error);
    }
  }
}
export default new SearchUserController();
