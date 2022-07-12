# USAGE: gen.sh PATH(s)
# PATH: project path which contains a proto directory and
#   a .proto named after the project (eg: blog, blog.proto)
#   and optionally some other .proto files

argc=$#
argv=("$@")
  # ./node_modules/.bin/grpc_tools_node_protoc -I  ./proto/                                   \
  #   --js_out=import_style=commonjs:./proto/                            \
  #   --grpc_out=grpc_js:./proto/                                        \
  #   ./proto/**.proto;
  # ./node_modules/.bin/grpc_tools_node_protoc -I ./proto/                                   \
  #   --js_out=import_style=commonjs:./proto/                            \
  #   $(find ./proto/ -type f -name "*.proto" -not -path "./proto/**.proto")

for (( j = 0; j < argc; ++j )); do
  ./node_modules/.bin/grpc_tools_node_protoc -I .//proto/                                   \
    --js_out=import_style=commonjs:.//proto/                            \
    --grpc_out=grpc_js:./proto/                                        \
    ./proto/${argv[j]}.proto;
  ./node_modules/.bin/grpc_tools_node_protoc -I ./proto/                                   \
    --js_out=import_style=commonjs:./proto/                            \
    $(find ./proto/ -type f -name "*.proto" -not -path "./proto/${argv[j]}.proto")
done