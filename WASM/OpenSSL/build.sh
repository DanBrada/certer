#!/bin/bash

OPENSSL_VERSION="openssl-3.3.0"
OPENSSL_DIR="src"

if [ -d ${OPENSSL_DIR} ]; then
  rm -rf ${OPENSSL_DIR}
fi

if [ ! -f ${OPENSSL_VERSION}.tar.gz ]; then
  curl -O https://www.openssl.org/source/${OPENSSL_VERSION}.tar.gz
fi

mkdir ${OPENSSL_DIR}
tar xf ${OPENSSL_VERSION}.tar.gz --strip-components=1 --directory=${OPENSSL_DIR}
cd ${OPENSSL_DIR} || exit 1

mkdir -p usr/local/ssl/
cp ../openssl.cnf usr/local/ssl/openssl.cnf

LDFLAGS="\
  -s ENVIRONMENT='web'\
  -s FILESYSTEM=1\
  -s MODULARIZE=1\
  -s EXPORT_NAME=OpenSSL\
  -s EXPORTED_RUNTIME_METHODS=\"['callMain', 'FS']\"\
  -s INVOKE_RUN=0\
  -s EXIT_RUNTIME=1\
  -s EXPORT_ES6=1\
  -s USE_ES6_IMPORT_META=0\
  -s ALLOW_MEMORY_GROWTH=1\
  --embed-file usr/local/ssl/openssl.cnf"

if [[ $1 == "debug" ]]; then
  LDFLAGS="$LDFLAGS -s ASSERTIONS=1" # For logging purposes.
fi

export LDFLAGS
export CC=emcc
export CXX=emcc

emconfigure ./Configure \
  no-hw \
  no-shared \
  no-asm \
  no-threads \
  no-ssl3 \
  no-dtls \
  no-engine \
  no-dso \
  linux-x32 \
  -static\

sed -i 's/$(CROSS_COMPILE)//' Makefile
emmake make -j 16 build_generated libssl.a libcrypto.a apps/openssl
mv apps/openssl apps/openssl.js

# Move the generated files to root so i can cleanup after
mv ${OPENSSL_DIR}/apps/openssl.wasm openssl.wasm
mv ${OPENSSL_DIR}/apps/openssl.js openssl.js