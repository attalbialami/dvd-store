import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { PriceController } from './price.controller';
import { CartService } from '../../app/cart-service';

describe('PriceController', () => {
  it('returns total price for given items', async () => {
    const cartService: CartService = {
      computeTotal: jest.fn().mockReturnValue(56),
    } as unknown as CartService;

    const app = express();
    app.use(bodyParser.json());

    const controller = new PriceController(cartService);
    app.post('/price', (req, res) =>
      controller.calculate(req, res),
    );

    const response = await request(app)
      .post('/price')
      .send({
        items: [
          'Back to the Future 1',
          'Back to the Future 2',
          'La chèvre',
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ total: 56 });
    expect(cartService.computeTotal).toHaveBeenCalledWith(
      'Back to the Future 1\nBack to the Future 2\nLa chèvre',
    );
  });

  it('returns 400 if items is missing', () => {
    const cartService = {
      computeTotal: jest.fn(),
    } as unknown as CartService;

    const controller = new PriceController(cartService);

    const req = {
      body: {},
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    controller.calculate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'items must be an array of strings',
    });
    expect(cartService.computeTotal).not.toHaveBeenCalled();
  });

  it('returns 400 if items is not an array', () => {
    const cartService = { computeTotal: jest.fn() } as any;
    const controller = new PriceController(cartService);

    const req = {
      body: { items: 'Back to the Future 1' },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    controller.calculate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
