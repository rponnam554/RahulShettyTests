module.exports = {
    default: {
        paths: [
            "features/**/*.feature"
        ],

        import: [
            "features/support/env.ts",
            "features/support/**/*.ts",
            "features/steps/**/*.ts"
        ],

        format: [
            "progress"
        ]
    }
};