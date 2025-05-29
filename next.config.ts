import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// Don't resolve 'fs' module on the client to prevent this error on build
			config.resolve.fallback = {
				fs: false,
				net: false,
				tls: false,
			};
		}
		return config;
	},
};

export default nextConfig;
