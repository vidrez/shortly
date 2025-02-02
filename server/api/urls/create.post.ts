export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    if (body.password) body.password = await hashPassword(body.password)

    body.slug = generateSlug()

    const result = await new UrlSchema(body).save()

    return { slug: result.slug }
  }
  catch (error) {
    return error
  }
})

const generateSlug = () => {
  return Math.random().toString(36).substring(2, 7)
}
