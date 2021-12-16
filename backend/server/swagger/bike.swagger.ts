export const getAllBikes = {
  tags: ['Flight'],
  description:
    'Returns all flights from the system that the user has access to',
  operationId: 'getAllFlights',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'All flights',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              FlightId: {
                type: 'string',
              },
              Name: {
                type: 'string',
              },
              Date: {
                type: 'string',
              },
              Price: {
                type: 'string',
              },
              Gate: {
                type: 'int',
              },
              DestinationId: {
                type: 'uuid',
              },
              StartId: {
                type: 'uuid',
              },
              PlaneId: {
                type: 'uuid',
              },
            },
          },
        },
      },
    },
    '400': {
      description: 'Data is undefined',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            items: {
              error: {
                type: 'text',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Catch error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            items: {
              error: {
                type: 'text',
              },
            },
          },
        },
      },
    },
  },
}
