# axios-resource

Simple Axios resource class to use as a base to implement REST API endpoints.

## Requirements

- axios

## Installation

```bash
npm install --save axios-resource
```

## Getting started

Create a simple implementation of a resource endpoint.

```javascript
import Resource from 'axios-resource';

export default class UserResource extends Resource {
    static URL = 'user/{id}';
}
```

Then expose the resource (e.g. through a service-like module).

```javascript
import axios from 'axios';
import UserResource from './resources/user';

const http = axios.create({
    baseURL: 'http://example.com'
});

export default {
    user: new UserResource({ http })
}
```

You're ready to use this simple API service module.

```javascript
import API from './api';

// GET http://example.com/user/me
API.user.fetch('me').then(({ data }) => {
    // data is the user attributes.
})
```
