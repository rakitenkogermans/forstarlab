import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { type BuildEnv, BuildMode, type BuildPaths } from './config/build/types/config';

const getApiUrl = (mode: BuildMode, apiUrl?: string) => {
    if (apiUrl) {
        return apiUrl;
    }

    if (mode === 'production') {
        return '/api';
    }

    return 'http://localhost:7770';
};

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        html: path.resolve(__dirname, 'public', 'index.html'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'dist'),
        src: path.resolve(__dirname, 'src'),
        public: path.resolve(__dirname, 'public'),
        publicLocales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'dist', 'locales'),
    };

    const mode = env?.mode || 'development';
    const isDev = mode === 'development';
    const PORT = env?.port || 3000;
    const apiUrl = getApiUrl(mode, env?.apiUrl);

    return buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    });
};
