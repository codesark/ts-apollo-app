# ts-apollo-app

Template for creating typescript projects with Apollo GraphQL

Commands which were used while setting up the project

```shell
npm init --yes
npm pkg set type="module"
npm install -D typescript nodemon ts-node @types/node @types/cors @graphql-codegen/cli @graphql-codegen/client-preset
npx tsc --init
npm install @apollo/server graphql dotenv cors body-parser sequelize pg pg-hstore 
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
npx graphql-code-generator init
```