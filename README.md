# miew-tests

1. `git clone git@github.com:IvanBioRender/miew-tests.git`
2. `cd miew-tests`
3. `yarn`

This requires my fork of Miew:

1. In another directory: `git clone git@github.com:IvanBioRender/miew.git`
2. `cd miew`
3. `yarn link`
4. Back in `miew-tests`: `yarn link miew`

When you make changes to `miew`, run the following in the fork's directory:

`yarn build:js:bundle && cp build/dist/Miew*.js dist/`

To build `miew-tests`: `NODE_OPTIONS=--max_old_space_size=4096 yarn start`

The build runs out of memory by default, so the limit has to be increased (`--max_old_space_size`).
