import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Resource from '../../dist/axios-resource.common';

class StubResource extends Resource {
    parse(response) {
        return response.data;
    }
}

describe('Axios resource', () => {
    const http = axios.create();
    const axiosMock = new MockAdapter(http);

    afterEach(() => {
        axiosMock.reset();
    });

    afterAll(() => {
        axiosMock.restore();
    });

    it('returns the complete URL', () => {
        const resource = new StubResource({ url: 'test/{id}' });

        expect(resource.url({ id: '123' })).toEqual('test/123');
        expect(resource.url()).toEqual('test/');
    });

    it('applies the URL keys', () => {
        const resource = new StubResource({ url: 'test/{id}' });
        expect(resource.url((resource.applyUrlKeys('123') || {}).keys))
            .toEqual('test/123');
        expect(resource.url((resource.applyUrlKeys() || {}).keys))
            .toEqual('test/');
    });

    it('parses the response', () => {
        const resource = new StubResource({
            url: 'test/',
            http,
        });
        const data = { test: 2 };
        axiosMock.onAny().reply(200, { data });

        return resource.fetch()
            .then((response) => {
                expect(response.data).toEqual(data);
            });
    });
});
