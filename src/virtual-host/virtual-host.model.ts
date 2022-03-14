import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class VirtualHost {
  @Field(() => ID)
  id: string | undefined;
}
