## Doc

https://ps-trophy.onrender.com/doc

## How to deploy

- Complete `.env.sample` and rename to `.env`
- `npm run start`

P.S. If you don't have a redis instance, try free database (memory limit 30MB) of [redislabs](https://redislabs.com/)

## How to get NPSSO

First Login your Sony account: https://my.playstation.com

Then access https://ca.account.sony.com/api/v1/ssocookie

## Serverless function

Files in `api` folder is used for serverless function. If you use free database, it may not work well due to insufficient connection.

## Thanks

- https://github.com/andshrew/PlayStation-Trophies
- https://www.rubydoc.info/gems/psn-api/2.0/PlayStationNetworkAPI
