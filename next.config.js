/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

await import("./src/env.js");
import createMDX from '@next/mdx'

const withMDX = createMDX({
        providerImportSource: "@mdx-js/react",
 })

/** @type {import("next").NextConfig} */
const config = {
    typescript:{
        ignoreBuildErrors: true,
    },
    eslint:{
        ignoreDuringBuilds: true,
    },
    images:{
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'breadstore.blob.core.windows.net',
          },
        ],   
    }
};

export default withMDX(config);
