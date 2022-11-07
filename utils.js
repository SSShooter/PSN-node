const propertiesMap = {
  accountId: {
    type: 'string',
    description: 'accountId or me, eg. 7044269709970808941',
  },
  accountIds: {
    type: 'array',
    description: `accountIds array, eg. ['7044269709970808941']`,
  },
  offset: {
    type: 'string',
    default: '1'
  },
  npCommunicationId: {
    type: 'string',
    description: 'Unique ID of the game, eg. NPWR08199_00'
  },
  trophyGroupId: {
    type: 'string',
    default: 'all',
    description: 'all to return all trophies for the game, otherwise restrict results to a specific trophy group'
  },
  npServiceName: {
    type: 'string',
    default: 'trophy',
    description: 'trophy for PS3, PS4, or PS Vita platforms, trophy2 for the PS5 platform'
  },
}

export function schemaGen(array) {
  const properties = {}
  for (let i = 0; i < array.length; i++) {
    const name = array[i]
    properties[name] = propertiesMap[name]
  }
  return {
    query: {
      type: 'object',
      properties,
    }
  }
}