import { app } from './app'
import { env } from './middlewares/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP server runnig on http://localhost:${env.PORT}`)
  })
