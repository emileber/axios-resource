# axios-resource

[![Build Status](https://travis-ci.org/emileber/axios-resource.svg?branch=master)](https://travis-ci.org/emileber/axios-resource)
[![Dependency Status](https://beta.gemnasium.com/badges/github.com/emileber/axios-resource.svg)](https://beta.gemnasium.com/projects/github.com/emileber/axios-resource)
[![npm version](https://badge.fury.io/js/axios-resource.svg)](https://www.npmjs.com/package/axios-resource) [![Greenkeeper badge](https://badges.greenkeeper.io/emileber/axios-resource.svg)](https://greenkeeper.io/)

Simple [axios](https://github.com/axios/axios) resource class to easily interact with a REST endpoint.

Explore [**the documentation**](https://emileber.github.io/axios-resource/).

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
