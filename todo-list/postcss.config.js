import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import postcssReporter from 'postcss-reporter';
import postcssPresetEnv from 'postcss-preset-env';

export default {
    plugins: [
        postcssImport(),
        autoprefixer(),
        postcssReporter({
            clearReportedMessages: true
        }),
        postcssPresetEnv({
            stage: 2,
            features: {
                "custom-media-queries": true,
                "nesting-rules": true,
            }
        })
    ]
}