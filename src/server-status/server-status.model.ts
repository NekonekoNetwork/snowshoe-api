import { ServerModel } from '@app/server/server.model';
import { BaseModel } from '@app/shared/base.model';
import { Field, Int } from '@nestjs/graphql';
import type { SampleMod, SamplePlayer, ServerStatus } from '@prisma/client';

export class ServerStatusModel extends BaseModel implements ServerStatus {
  @Field(() => String, { nullable: false })
  serverId!: string;
  @Field(() => ServerModel, { nullable: false })
  server?: ServerModel;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => String, { nullable: false })
  versionName!: string;
  @Field(() => String, { nullable: false })
  versionProtocol!: string;

  @Field(() => Int, { nullable: false })
  playersOnline!: number;
  @Field(() => Int, { nullable: false })
  playersMax!: number;
  @Field(() => [SamplePlayerModel], { nullable: true })
  players?: SamplePlayerModel[] | null;

  @Field(() => String, { nullable: true })
  modInfoType!: string | null;
  @Field(() => [SampleModModel], { nullable: true })
  modInfo?: SampleModModel[] | null;

  @Field(() => String, { nullable: true })
  favicon!: string | null;
}

export class SamplePlayerModel implements SamplePlayer {
  @Field(() => String, { nullable: false })
  serverStatusId!: string;
  @Field(() => ServerStatusModel, { nullable: false })
  serverStatus?: ServerStatusModel;

  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: false })
  id!: string;
}

export class SampleModModel implements SampleMod {
  @Field(() => String, { nullable: false })
  serverStatusId!: string;
  @Field(() => ServerStatusModel, { nullable: false })
  serverStatus?: ServerStatusModel;

  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: false })
  version!: string;
}
