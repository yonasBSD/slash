package assets

import (
  "embed"
)

//go:embed dist
var WebAssets embed.FS
