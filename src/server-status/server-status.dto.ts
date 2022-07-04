import { ServerStatusModel } from '@app/server-status/server-status.model';
import { Field, InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateServerStatusSamplePlayerInput {
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: false })
  id!: string;
}

@InputType()
export class UpdateServerStatusSampleModInput {
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: false })
  version!: string;
}

@InputType()
export class UpdateServerStatusInput extends OmitType(ServerStatusModel, [
  'id',
  'server',
  'serverId',
  'players',
  'modInfo',
  'createdAt',
  'updatedAt',
] as const) {
  @Field(() => [UpdateServerStatusSamplePlayerInput], { nullable: true })
  players!: UpdateServerStatusSamplePlayerInput[] | null;
  @Field(() => [UpdateServerStatusSampleModInput], { nullable: true })
  modInfo!: UpdateServerStatusSampleModInput[] | null;
}
