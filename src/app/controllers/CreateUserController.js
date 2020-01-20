import Dev from '../models/Dev';
import api from '../../services/githubApi';
import parseStringAsArray from '../../utils/parseStringAsArray';
import { findConnections, sendMessage } from '../../webSockets';

class CreateUserController {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    try {
      let dev = await Dev.findOne({ github_username });

      if (!dev) {
        const response = await api.get(`/users/${github_username}`);

        const { name, bio, avatar_url } = response.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };

        dev = await Dev.create({
          name,
          github_username,
          bio,
          avatar_url,
          techs: techsArray,
          location,
        });

        const sendSocketMessageTo = findConnections(
          { latitude, longitude },
          techsArray
        );

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
      }

      return res.send(dev);
    } catch (error) {
      return res.send(error);
    }
  }
}
export default new CreateUserController();
