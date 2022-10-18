import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => String)
  id!: string;

  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}
