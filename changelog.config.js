module.exports = {
  "commitUrlFormat": "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
  "compareUrlFormat": "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
  "types": [
    { "type": "feat", "section":"Features" },
    { "type": "fix", "section": "Bug Fixes" },
    { "type": "vuln", "section": "Security Updates" },
    { "type": "docs", "hidden": true },
    { "type": "style", "hidden": true },
    { "type": "refactor", "hidden": true},
    { "type": "perf", "hidden": true },
    { "type": "test", "hidden": true },
    { "type": "build", "hidden": true },
    { "type": "ci", "hidden": true },
    { "type": "chore", "hidden": true },
    { "type": "revert", "hidden": true},
  ]
}
