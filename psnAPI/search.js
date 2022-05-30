import link from '../link.js'

export async function searchPlayer(data) {
  var config = {
    method: 'post',
    url: '/api/search/v1/universalSearch',
    data,
  }
  return link(config)
}
