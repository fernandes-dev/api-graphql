import 'reflect-metadata'
import {ApolloServer} from "apollo-server";
import {buildSchema} from "type-graphql";
import {AppointmentsResolver} from "./resolvers/appointments-resolver";
import * as path from "node:path";

async function main() {
  const schema = await buildSchema({
    resolvers: [
      AppointmentsResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  })

  const server = new ApolloServer({
    schema
  })

  const {url} = await server.listen()

  console.log(`server running at: ${url}`)
}

main().catch(err => console.error(err))
