import { UpdateServerStatusSampleModInput } from '@app/common/server-status/dto/update-server-status-sample-mod.input';
import { UpdateServerStatusSamplePlayerInput } from '@app/common/server-status/dto/update-server-status-sample-player.input';
import { ServerStatusModel } from '@app/common/server-status/model/server-status.model';
import { Field, InputType, OmitType } from '@nestjs/graphql';

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
