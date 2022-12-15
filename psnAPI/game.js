import link from '../link.js'

export async function getGameInfo({ accountId, titleId }) {
  var config = {
    method: 'get',
    url: `/api/gamelist/v2/users/${accountId}/titles/${titleId}`,
  }
  return link(config)
}
