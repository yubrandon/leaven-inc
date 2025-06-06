# API Endpoints

### `/register`
`POST - Add a user to database` 

### `/user/:id`
`GET  - Fetch user from database given id`

### `/items`
`POST - Add a new item to database`
`GET  - Fetch list of all items and related info`

### `/items/:name`
`GET  - Fetch info for a specific item using its name`

### `/items/:id`
`POST - Update any new information for an item using its id`

### `/items/:id/delete`
`POST - Delete an item and its image entry`

### `/orders`
`POST - Add a new order to the database`
`GET  - Fetch list of all orders`

## Unimplemented
`GET /orders/:orderId` 
* Look up a specific order #
`GET /user/:id/orders`
* Look up all orders for a specific user

