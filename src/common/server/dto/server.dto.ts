import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { PingPassthrough } from '@prisma/client';

@InputType()
export class CreateServerInput {
  @Field(() => String)
  namespaceId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  address!: string;
  @Field(() => Int)
  port!: number;

  @Field(() => String, { nullable: true })
  motd?: string | null;

  @Field(() => PingPassthrough, { nullable: true })
  pingPassthrough?: PingPassthrough;
}

@InputType()
export class UpdateServerInput extends PartialType(CreateServerInput) {}
