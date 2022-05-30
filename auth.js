import axios from 'axios'
const authAjax = axios.create({
  baseURL: 'https://ca.account.sony.com/api/authz/v3/',
  timeout: 15000,
})

// https://ca.account.sony.com/api/v1/ssocookie

async function getCode() {
  var config = {
    method: 'get',
    url: '/oauth/authorize',
    headers: {
      Cookie: 'npsso=' + process.env.NPSSO,
    },
    params: {
      access_type: 'offline',
      client_id: 'ac8d161a-d966-4728-b0ea-ffec22f69edc',
      redirect_uri: 'com.playstation.PlayStationApp://redirect',
      response_type: 'code',
      scope: 'psn:mobile.v1 psn:clientapp',
    },
    maxRedirects: 0,
  }
  try {
    await authAjax(config)
  } catch (err) {
    if (err.response) {
      if (err.response.headers.location) {
        const resUrl = new URL(err.response.headers.location)
        return resUrl.searchParams.get('code')
      } else {
        throw new Error(JSON.stringify(err.response))
      }
    } else {
      return null
    }
  }
}
async function getToken(code) {
  var data = new URLSearchParams({
    code,
    redirect_uri: 'com.playstation.PlayStationApp://redirect',
    grant_type: 'authorization_code',
    token_format: 'jwt',
  }).toString()
  var config = {
    method: 'post',
    url: '/oauth/token',
    headers: {
      Authorization:
        'Basic YWM4ZDE2MWEtZDk2Ni00NzI4LWIwZWEtZmZlYzIyZjY5ZWRjOkRFaXhFcVhYQ2RYZHdqMHY=',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  }

  const response = await authAjax(config)
  return response.data.access_token
}

export default async function auth() {
  console.log('getCode')
  const code = await getCode()
  if (!code) return null
  console.log('getToken')
  const token = await getToken(code)
  return token
}
