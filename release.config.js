  module.exports = {
    "branches": ["main", "develop"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      [
        "@semantic-release/release-notes-generator", 
        {
          "preset": "conventionalcommits",
          "releaseRules": [
            { "type": "feat", "release":"minor" },
            { "type": "fix", "release": "patch" },
            { "type": "docs", "release": false },
            { "type": "style", "release": false },
            { "type": "refactor", "release": false },
            { "type": "perf", "release": "patch" },
            { "type": "test", "release": false },
            { "type": "build", "release": false },
            { "type": "ci", "release": false },
            { "type": "chore", "release": false },
            { "type": "revert", "release": "patch" },
          ]
        }
      ],
      [
        "@semantic-release/git",
        {
          "assets": ["CHANGELOG.md"],
        }
      ],
      [
        "@semantic-release/exec",
        {
          "publishCmd" : "yarn deploy:all"
        }

      ]
  ]
}
