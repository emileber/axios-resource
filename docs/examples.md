# Examples

## Complete resource

```javascript
// user.js
import Resource from 'axios-resource';

export default class UserResource extends Resource {
    static URL = 'https://some-domain.com/api/user/{userId}/info'; // special url
    static ID_ATTRIBUTE = 'userId';
    
    parse(response) {
        return response.data;
    }
}
```

## Using the resource

```javascript
import UserResource from './user';

const user = new UserResource();

// GET https://some-domain.com/api/user/me/info
user.fetch('me')
    .then(({data}) => {
        console.log('User data:', data);
    })
```
