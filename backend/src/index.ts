import cookie from '@fastify/cookie'
import Fastify from 'fastify'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'dev-sandbox-jwt-secret-change-for-production'
const COOKIE_NAME = 'access_token'

/** Тестовый пользователь (логин / пароль). */
const DEMO = { username: 'demo', password: 'demo123' } as const

async function buildApp() {
  const app = Fastify({ logger: true })

  await app.register(cookie)

  app.post('/auth/login', async (request, reply) => {
    const body = request.body as { username?: string; password?: string }
    const username = body?.username?.trim()
    const password = body?.password ?? ''
    if (!username || !password) {
      return reply.code(400).send({ message: 'Укажите логин и пароль' })
    }
    if (username !== DEMO.username || password !== DEMO.password) {
      return reply.code(401).send({ message: 'Неверный логин или пароль' })
    }
    const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '7d' })
    reply.setCookie(COOKIE_NAME, token, {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    })
    return { ok: true }
  })

  app.post('/auth/logout', async (_request, reply) => {
    reply.clearCookie(COOKIE_NAME, { path: '/' })
    return { ok: true }
  })

  app.get('/auth/me', async (request, reply) => {
    const token = request.cookies[COOKIE_NAME]
    if (!token) {
      return reply.code(401).send({ user: null })
    }
    try {
      const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
      const sub = typeof payload.sub === 'string' ? payload.sub : null
      if (!sub) {
        return reply.code(401).send({ user: null })
      }
      return { user: { sub } }
    } catch {
      reply.clearCookie(COOKIE_NAME, { path: '/' })
      return reply.code(401).send({ user: null })
    }
  })

  return app
}

const port = Number(process.env.PORT) || 3000

const app = await buildApp()
await app.listen({ port, host: '0.0.0.0' })
