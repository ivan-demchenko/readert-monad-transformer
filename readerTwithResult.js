/**
 * This snippet demonstrates how to use
 * ReaderT monad transformer with Result monad.
 * Error handling is managed by the Reader Monad
 */
const Reader = require('fantasy-readers');
const Result = require('folktale/result');

const ReaderResult = Reader.ReaderT(Result);

// Wrapper around a database
const DB = {
    getUser: (id) =>
        // a silly check to simulate a missing
        typeof id === 'number'
            ? Result.Ok(({ id: id, name: `User${id}` }))
            : Result.Error('Bad userId')
};

// Wrapper around network
const Network = {
    fetchAvatar: (userName) =>
      Result.of(`/img/${userName.toLowerCase()}.jpeg`)
}

const fetchUser = (userId) => ReaderResult((env) => {
    return env.db.getUser(userId);
});

const fetchAvatar = (resUser) => ReaderResult((env) => {
    return env.network.fetchAvatar(resUser.name);
});

const program = fetchUser(1).chain(fetchAvatar);

const env = {
    db: DB,
    network: Network
};

console.log(
    program.run(env)
);