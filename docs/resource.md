# Resource API

## Properties

### `http`

This is the _axios_ instance, which is the global axios instance by default.

### `_url`

The instance URL template. Used within the `url` method.

## Static properties

These are used as defaults value for the resource class.

### `URL`

The resource URL or path.

When using an axios instance with a default `baseUrl`, you can omit the domain part and simply specify the path to the resource, including any parameters wrapped within brackets `{param}`.

```javascript
static URL = 'path/to/resource/{resourceId}';
```

### `ID_ATTRIBUTE`

The key of the parameter within the resource URL which represents this resource ID. Default to `id`.

In the previous example, `{resourceId}` is placed within the URL, so the `ID_ATTRIBUTE` should be set:

```javascript
static ID_ATTRIBUTE = 'resourceId';
```

## Options

Any option passed to the constructor of a resource will override the default attribute set with a static property.



## Methods

All the methods are made to be easily overriden for custom behaviors or testing purposes.

!> The `options` object is passed to _axios_ so it takes the same properties, in addition to `keys` which is specially used for the URL template parameters.

### `fetch(id, options)`

Proxy a `GET` request to `sync` with an optional `id`.

### `create(attrs, options)`

Proxy a `POST` request to `sync` with an `attrs` hash.

### `patch(id, attrs, options)`

Proxy a `PATCH` request to `sync` with an optional `id` and an `attrs` hash.

### `delete(id, options)`

Proxy a `DELETE` request to `sync` with an optional `id`.

### `parse(response)`

Called whenever a resource's data is returned by the server, e.g. after a `fetch` or `create`. The function is passed the raw `response` object, and should return the attributes hash to use as response data. The default implementation is a no-op, simply passing through the raw response. Override this if you need to work with a preexisting API, or better namespace your responses.

Some API resources are nested within a `data` property, you can handle that here:

```javascript
parse(response) {
    return response.data;
}
```

!> Note that _axios_ responses are always nested within a `data` property, regardless of what's being returned by the server. So a nested response from the server would be accessed with `response.data.data` in the `then` callback.

### `sync(method, data, options)`

All HTTP alias methods pass through here. Default axios request options are set and passed to the `http` axios instance.

?> Overriding or mocking this method is a good way to completely change the behavior of resource for a test or a different situation (like using the localStorage instead).

### `url(keys)`

Builds the final URL to send to axios for the request. It uses [_pupa_](https://github.com/sindresorhus/pupa) simple templating function to replace the URL parameters.

?> Override the `url` method to easily use another templating function.

### `applyUrlKeys(id, options)`

Used to automatically add the `id` attribute to the `keys` used for the URL template. 
