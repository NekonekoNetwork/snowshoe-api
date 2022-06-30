import { NamespaceModule } from '@app/namespace/namespace.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { ServerModule } from '@app/server/server.module';
import { VirtualHostModule } from '@app/virtual-host/virtual-host.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FallbackModule } from './fallback/fallback.module';
import { ServerStatusModule } from './server-status/server-status.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    FallbackModule,
    NamespaceModule,
    ServerModule,
    VirtualHostModule,
    ServerStatusModule,
  ],
})
export class AppModule {}
