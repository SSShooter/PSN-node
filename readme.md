# PSN-node

APIs for fetching psn trophy information. Related front-end project, see: [PSN-node-displayer](https://github.com/ssshooter/PSN-node-displayer)

## Doc

https://ps-trophy.onrender.com/doc

## Notice

- All data fetched from playstation API will be cached in Redis for reducing requests to playstation API.
- Those data will be stale after 12 hours, before that you get the cached data.
- If you don't have a Redis instance, try free one (memory limit 30MB) of [redislabs](https://redislabs.com/)

## How to deploy

- Complete `.env.sample` and rename to `.env`
- `npm run start`

## How to get NPSSO

- Login your Sony account: https://my.playstation.com
- Access: https://ca.account.sony.com/api/v1/ssocookie

## Serverless function

Files in `api` folder is used for serverless function. If you use free database, it may not work well due to insufficient connection.

## Thanks

- https://github.com/andshrew/PlayStation-Trophies
- https://www.rubydoc.info/gems/psn-api/2.0/PlayStationNetworkAPI
