export { VirusTotal }

class VirusTotal {
  api_key: string | undefined = ''
  url: string = ''
  analysisStats: {
    status: number
    malicious: number
    undetected: number
    harmless: number
    suspicious: number
    timeout: number
  } = {
      status: 0,
      malicious: 0,
      undetected: 0,
      harmless: 0,
      suspicious: 0,
      timeout: 0,
    }

  constructor(url: string) {
    this.api_key = process.env.VIRUSTOTAL_API_KEY
    this.url = url
  }

  async scanUrl() {
    await this.getAnalysis()
    if (this.analysisStats.status === 200) return this.analysisStats

    const options: object = {
      method: 'POST',
      body: new URLSearchParams({
        url: this.url,
      }),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'x-apikey': this.api_key,
      },
    }

    await fetch('https://www.virustotal.com/api/v3/urls', options)
      .then(async (res) => {
        if (!res.ok) return
        // await this.getAnalysis(4)
      })
      .catch(err => console.error(err))

    return this.analysisStats
  }

  async getAnalysis(scanAttempts: number = 0) {
    const options: object = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-apikey': this.api_key,
      },
    }

    const base64UrlEncode = btoa(this.url).replaceAll('=', '')

    await fetch(`https://www.virustotal.com/api/v3/urls/${base64UrlEncode}`, options)
      .then(async (res) => {
        this.analysisStats.status = res.status

        if (res.status === 404 && scanAttempts > 0) {
          setTimeout(() => {
            this.getAnalysis(scanAttempts - 1)
          }, 2000)
        }

        if (!res.ok) return

        const response = await res.json()
        this.analysisStats = { ...this.analysisStats, ...response.data.attributes.last_analysis_stats }
      })
      .catch(err => console.error(err))
  }
}
