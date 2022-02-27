import type * as grpc from '@grpc/grpc-js';
import type * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import type { IHelloWorldServer } from "../generated/proto/hello_grpc_pb";
import * as hello_pb from "../generated/proto/hello_pb";

export class HelloServer implements IHelloWorldServer {

    [name: string]: grpc.UntypedHandleCall;

    hello(_: grpc.ServerUnaryCall<google_protobuf_empty_pb.Empty, hello_pb.Hello>, callback: grpc.sendUnaryData<hello_pb.Hello>): void {
        const response = new hello_pb.Hello()
        response.setName("HogeHoge")
        callback(null, response);
    }
}