import Dev from '../models/Dev';

class ListUserController {
  async index(req, res) {
    try {
      const dev = await Dev.find({});
      return res.send(dev);
    } catch (error) {
      return res.send(error);
    }
  }
}
export default new ListUserController();
