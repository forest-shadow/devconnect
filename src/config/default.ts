export default {
  mongoURI: (user: string, password: string) => `mongodb+srv://${user}:${password}` +
    `@devconnect-phapj.mongodb.net/test?retryWrites=true&w=majority`
}