import { rest } from "msw"

export const getCheck =  rest.get('/check', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
          status: 'success',
        }),
    )
  })