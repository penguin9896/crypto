redis will need to be installed to run the application and running before hand for this application to work


Here are relevant links to configure redis on your local machine:

MacOS: https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298

Linux: https://redis.io/topics/quickstart

Windows: https://github.com/ServiceStack/redis-windows


This implementation uses nodejs and also jest for test driven developement. This crypto implementation is very similar to bitcoin implementation having a timestamp
  lastHash,  hash, data,  nonce,  difficulty, elliptic curve, and etc. The blockchain is in index.js which has the blockchain class which holds the chain array. It has a proof of work system which tries to find the correct nonce value, the difficulty and mine rate are set to low values for convenience. This implementation uses a pub/sub implementation for nodes communicating on the network. Pub/sub are short for publisher and subscriber where there is a channel, the publisher (someone who sends a blockchain on the channel) and subscriber( someone who waits for a incoming chain on the channel), nodes on the networking are both publishers and subscribers, each blockchain is sent as a json and replace chain is called each time a subscriber recieves a blockchain from there the node replaces its on chain with the new incoming one if its valid. To really deploy you would need multiple of these pub/sub channels out in different locations so nodes can connect to it and have a program which would connect each node pub/sub server. Transactions are also send through the channels and each node can decided which transaction they want to include. Also using express to fetch json blockchain and transaction to display them.



run the commands npm run dev and npm run dev-peer and connect to localhost:3000 with a browser, since running npm run dev-peer picks a diffrent port each time it is ran, you will need to check what it console.log the port number and then use that to connect i.e. localhost:3156


currently working on deploying
