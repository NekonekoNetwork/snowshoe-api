import {
  SampleModModel,
  SamplePlayerModel,
  ServerStatusModel,
} from '@app/server-status/server-status.model';
import { Field, InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateServerStatusSamplePlayerInput extends OmitType(
  SamplePlayerModel,
  ['serverStatusId', 'serverStatus'] as const,
) {}

@InputType()
export class UpdateServerStatusSampleModInput extends OmitType(SampleModModel, [
  'serverStatusId',
  'serverStatus',
] as const) {}

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
