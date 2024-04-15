# OpenSSL WASM Build

I hate myself for having to do this, because while some solutions already exist, I cannot believe someone hasn't put openssl into
separate node.js module yet. So if you happen to want to do it, I will maybe manage to build it and put the binary in releases or sth.
Definitely putting my journey here.

## The build
As I know fuck all about compiling for WASM, I heard about this thing called emscripten.
Since I'm a windows enjoyer, I find compiling basically anything c related under it virtually impossible,
I'll try to do it under WSL2.

    sudo apt install emscripten

So I first installed emscripten, since linux takes care of dependencies, I hopefully won't have to worry about some missing dependencies.
On fresh installation of WSL2 Debian it was around 2GB of space already gone.

Then I yoinked [this build script](https://github.com/janeumnn/openssl-webapp/blob/main/openssl/build.sh) from github and updated the OpenSSL Version.
I also yoinked the openssl config from the same repository.

    ./build.sh

After finding the build was successful, I just added some

```bash
# Move the generated files to root so i can cleanup after
mv ${OPENSSL_DIR}/apps/openssl.wasm openssl.wasm
mv ${OPENSSL_DIR}/apps/openssl.js openssl.js
```

to move the binaries to library root.