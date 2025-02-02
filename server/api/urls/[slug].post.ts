import { VirusTotal } from '~/server/utils/virustotal'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const password: string | null = body?.password || null

    // check that expiry date is greater than current date or null
    const result = await UrlSchema.findOne({ slug: event.context.params?.slug, $or: [{ expiryDate: null }, { expiryDate: { $gt: new Date() } }] }).then(async (url) => {
      if (!url) return { error: 'URL not found' }
      if (!url?.password) return handleResponse(url?.destination.toString())
      if (!password) return { error: 'Password required' }

      const resourcePassword: string = url.password.toString()
      const passwordMatch = await verifyPassword(resourcePassword, password)
      if (passwordMatch) return handleResponse(url?.destination.toString())

      return { error: 'Incorrect password' }
    })

    return result
  }
  catch (error) {
    return error
  }
})

async function handleResponse(destination: string | undefined) {
  if (!destination) return { error: 'URL not found' }
  if (process.env.VIRUSTOTAL_ENABLED !== 'true') return { destination }

  const virusTotal = new VirusTotal(destination)
  const analysisStats = await virusTotal.scanUrl()

  return { destination, analysisStats }
}
