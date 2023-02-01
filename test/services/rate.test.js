/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import Rate from '../../src/models/rate';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Rate Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('retrieves a rate', async function () {
    const shipment = await this.client.Shipment.create(Fixture.basicShipment());

    const rate = await this.client.Rate.retrieve(shipment.rates[0].id);

    expect(rate).to.be.an.instanceOf(Rate);
    expect(rate.id).to.match(/^rate_/);
  });

  it('throws on create', function () {
    return this.client.Rate.create().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on all', function () {
    return this.client.Rate.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
