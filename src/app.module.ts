import { DestinationModule } from '@app/common/destination/destination.module';
import { FallbackModule } from '@app/common/fallback/fallback.module';
import { NamespaceModule } from '@app/common/namespace/namespace.module';
import { ServerStatusModule } from '@app/common/server-status/server-status.module';
import { ServerModule } from '@app/common/server/server.module';
import { VirtualHostModule } from '@app/common/virtual-host/virtual-host.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DestinationModule,
    NamespaceModule,
    ServerModule,
    ServerStatusModule,
    VirtualHostModule,
    FallbackModule,
  ],
})
export class AppModule {}
