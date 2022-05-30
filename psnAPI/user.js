import link from '../link.js'

export async function getProfile(accountId) {
  var config = {
    method: 'get',
    url: `/api/userProfile/v1/internal/users/${accountId}/profiles`,
  }
  return link(config)
}

export async function getProfiles(accountIds) {
  var config = {
    method: 'get',
    url: `/api/userProfile/v1/internal/users/profiles?accountIds=${accountIds}`,
  }
  return link(config)
}

export async function getFriends(accountId) {
  var config = {
    method: 'get',
    url: `/api/userProfile/v1/internal/users/${accountId}/friends?limit=1000`,
  }
  return link(config)
}
