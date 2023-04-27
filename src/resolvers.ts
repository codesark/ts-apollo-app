import { Kind, GraphQLScalarType } from "graphql";
import config from "./config";
import { HelloResponse, Resolvers } from "./generated/graphql";


const resolvers: Resolvers = {
  Any: new GraphQLScalarType({
    name: "Object",
    description: "Arbitrary object",
    parseValue: (value) => {
      return typeof value === "object"
        ? value
        : typeof value === "string"
        ? JSON.parse(value)
        : null;
    },
    serialize: (value) => {
      return typeof value === "object"
        ? value
        : typeof value === "string"
        ? JSON.parse(value)
        : null;
    },
    parseLiteral: (ast) => {
      switch (ast.kind) {
        case Kind.STRING:
          return JSON.parse(ast.value);
        case Kind.OBJECT:
          throw new Error(
            `Not sure what to do with OBJECT for ObjectScalarType`
          );
        default:
          return null;
      }
    },
  }),
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value: any) {
      return new Date(value); // value from the client
    },
    serialize(value: any) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    hello: async (parent, args, context, info): Promise<HelloResponse> => {
      return {
        message: args.message
      };
    },
  },
};

export default resolvers;
