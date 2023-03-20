# PSN-node

APIs for fetching psn trophy information. Related front-end project, see: [PSN-node-displayer](https://github.com/ssshooter/PSN-node-displayer)

## Doc

https://ps-trophy.onrender.com/doc

## Notice

- All data fetched from playstation API will be cached in Redis for reducing requests to playstation API.
- Those data will be stale after 24 hours, before that you get the cached data.
- If you don't have a Redis instance, try free one (memory limit 30MB) on [redislabs](https://redislabs.com/)
- After 2.0.0, `NPSSO` should be setted by `/setNPSSO` api.

## How to get NPSSO

- Login your Sony account: https://my.playstation.com
- Access: https://ca.account.sony.com/api/v1/ssocookie

## How to deploy

- Prerequisite: prepare your Redis instance and NPSSO
- Complete `.env.sample` and rename it to `.env`
- `npm run start`

## Serverless function

Files in `api` folder is used for serverless function. If you use free database, it may not work well due to insufficient connection.

## Thanks

- https://github.com/andshrew/PlayStation-Trophies
- https://www.rubydoc.info/gems/psn-api/2.0/PlayStationNetworkAPI
