import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Customer {
  @Field()
  id: number

  @Field()
  name: string
}