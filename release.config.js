  module.exports = {
    "branches": ["main", "develop"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      [
        "@semantic-release/release-notes-generator", 
        {
          "preset": "conventionalcommits",
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
