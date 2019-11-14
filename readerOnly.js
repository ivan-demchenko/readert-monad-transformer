/**
 * This snippet demonstrated how to use Reader monad only.
 * Error handling is not considered here
 */
const Reader = require('fantasy-readers');

const DB = {
    getUser: (id) => ({ id: id, name: `User${id}` })
};

const Network = {
    fetchAvatar: (userName) => `/img/${userName.toLowerCase()}.jpeg`
}

const fetchUser = (userId) => Reader((env) => {
    return env.db.getUser(userId);
});

const fetchAvatar = (user) => Reader((env) => {
    return env.network.fetchAvatar(user.name);
});

const program = fetchUser(1).chain(fetchAvatar);

const env = {
    db: DB,
    network: Network
};

console.log(
    program.run(env)
);