import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import postcssReporter from 'postcss-reporter';
import postcssPresetEnv from 'postcss-preset-env';
import { plugin } from 'postcss';

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
                "nesting-rules": true,
                "custom-media-queries": true
            }
        })
    ]
}