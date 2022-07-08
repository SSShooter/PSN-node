import { getTrophyTitles } from '../psnAPI/trophy.js'

export default async function handler(request, response) {
  const data = await getTrophyTitles(request.query)
  return response.status(200).json(data)
}
