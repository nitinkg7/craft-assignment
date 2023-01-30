// import ApolloClient from "apollo-boost";
import { ApolloClient, InMemoryCache } from "@apollo/react-hooks";

const GRAPHQL_BASE_URL = "https://cmscraft-app.ddev.site/api";

export const client = new ApolloClient({
  uri: GRAPHQL_BASE_URL,
  cache: new InMemoryCache(),
});
