import { getAllBikes } from './bike.swagger'

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description: 'your description here',
    termsOfService: '',
  },
  tags: [],
  paths: {
    '/api/v1/destination/all': { get: getAllBikes },
  },
}
