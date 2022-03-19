import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class NamespaceModel {
  @Field(() => String)
  id!: string
  @Field(() => String)
  name!: string
}
