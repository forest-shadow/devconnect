export default {
  mongoURI: (user: string, password: string) => `mongodb+srv://${user}:${password}` +
    `@devconnect-phapj.mongodb.net/test?retryWrites=true&w=majority`,
  githubUri: (username: string, clientId: string, clientSecret: string) =>
    `https://api.github.com/users/${username}` +
    `/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`

}