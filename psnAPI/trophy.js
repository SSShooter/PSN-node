import linkWrapper, { link } from '../link.js'
import redisClient from '../redis.js'

export async function getTrophySummary(accountId = 'me') {
  const config = {
    method: 'get',
    url: `/api/trophy/v1/users/${accountId}/trophySummary`,
  }
  return linkWrapper(config)
}

export function getSingleTitle(npCommunicationId) {
  return redisClient.get('gameInfo:' + npCommunicationId)
}

export async function getTrophyTitles({ accountId = 'me', offset = 0 }) {
  const url = `/api/trophy/v1/users/${accountId}/trophyTitles?offset=${offset}`
  const cache = await redisClient.get(url)
  if (cache) {
    return JSON.parse(cache)
  }
  const config = {
    method: 'get',
    url,
  }
  const data = await link(config)
  redisClient.set(url, JSON.stringify(data), {
    NX: true,
  })
  for (let i = 0; i < data.trophyTitles.length; i++) {
    const trophyTitle = data.trophyTitles[i]
    const {
      npServiceName,
      trophyTitleName,
      trophyTitleDetail,
      trophyTitleIconUrl,
      trophyTitlePlatform,
      npCommunicationId,
      definedTrophies,
    } = trophyTitle
    redisClient.set(
      'gameInfo:' + trophyTitle.npCommunicationId,
      JSON.stringify({
        npServiceName,
        trophyTitleName,
        trophyTitleDetail,
        trophyTitleIconUrl,
        trophyTitlePlatform,
        npCommunicationId,
        definedTrophies,
      }),
      {
        NX: true,
      }
    )
  }
  return data
}
export async function getGameTrophy({
  npCommunicationId,
  trophyGroupId,
  npServiceName,
}) {
  trophyGroupId = trophyGroupId || 'all'
  const url = `/api/trophy/v1/npCommunicationIds/${npCommunicationId}/trophyGroups/${trophyGroupId}/trophies`
  const config = {
    method: 'get',
    url,
    params: {
      npServiceName,
    },
  }
  return linkWrapper(config)
}

export async function getGameTrophyGroup({ npCommunicationId, npServiceName }) {
  const url = `/api/trophy/v1/npCommunicationIds/${npCommunicationId}/trophyGroups`
  const config = {
    method: 'get',
    url,
    params: {
      npServiceName,
    },
  }
  return linkWrapper(config)
}

export async function getEarnedTrophy({
  npCommunicationId,
  trophyGroupId,
  accountId,
  npServiceName,
}) {
  trophyGroupId = trophyGroupId || 'all'
  accountId = accountId || 'me'
  const url = `/api/trophy/v1/users/${accountId}/npCommunicationIds/${npCommunicationId}/trophyGroups/${trophyGroupId}/trophies`
  const config = {
    method: 'get',
    url,
    params: {
      npServiceName,
    },
  }
  return linkWrapper(config)
}
