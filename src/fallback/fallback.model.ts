import { NamespaceModel } from '@app/namespace/namespace.model';
import { ServerModel } from '@app/server/server.model';
import { BaseModel } from '@app/shared/base.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Fallback')
export class FallbackModel extends BaseModel {
  @Field(() => NamespaceModel, { nullable: false })
  namespace?: NamespaceModel;
  @Field(() => ServerModel, { nullable: true })
  server?: ServerModel | null;

  @Field(() => [NamespaceModel], { nullable: false })
  namespaces?: NamespaceModel[];
  @Field(() => [ServerModel], { nullable: false })
  servers?: ServerModel[];
}
