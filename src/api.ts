import { Login } from './Controllers/Login';
import { Order } from './Controllers/Order';
import { ImageLookup } from './Controllers/ImageLookup';

const login = new Login();
const imageLookup = new ImageLookup();

const API_PREFIX = '/api/v1';
const order = new Order();

export = app => {
  app.get(`${API_PREFIX}/image-lookup`, imageLookup.get);

  app.post(`${API_PREFIX}/login`, (req, res) => login.login(req, res));
  app.get(`${API_PREFIX}/logout`, (req, res) =>
    req.session.destroy(() => res.redirect('/login'))
  );

  app.post(`${API_PREFIX}/order`, (req, res) => order.addToOrder(req, res));
  app.post(`${API_PREFIX}/order/checkout`, (req, res) =>
    order.checkout(req, res)
  );
  app.delete(`${API_PREFIX}/order`, (req, res) => order.removeOrder(req, res));
};
