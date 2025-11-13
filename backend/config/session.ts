import env from '#start/env'
import { defineConfig, stores } from '@adonisjs/session'

const sessionConfig = defineConfig({
  enabled: true,
  cookieName: 'adonis-session',
  clearWithBrowser: false,
  age: '24h',

  cookie: {
    path: '/',
    httpOnly: true,
    secure: false, // set to true only in production with HTTPS
    sameSite: 'lax', // changed from 'none' for localhost
  },

  store: env.get('SESSION_DRIVER', 'cookie'),

  stores: {
    cookie: stores.cookie(),
  },
})

export default sessionConfig
