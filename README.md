redis will need to be installed to run the application and running before hand for this application to work


Here are relevant links to configure redis on your local machine:

MacOS: https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298

Linux: https://redis.io/topics/quickstart

Windows: https://github.com/ServiceStack/redis-windows




use npm run dev and also npm run dev-client to start it

This implementation uses nodejs and also jest for test driven developement. A pub/sub is also used for the networking of communication with different nodes on the blockchain

run the commands npm run dev and npm run dev-peer and connect to localhost:3000 with a browser, since running npm run dev-peer picks a diffrent port each time it is ran, you will need to check what it console.log the port number and then use that to connect i.e. localhost:3156


currently working on deploying
