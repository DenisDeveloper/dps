module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import FFI (_log)
import Jack.VNode (node)
-- import Html (div)
-- import Html.Attributes (style)

main :: Effect Unit
main = do
  -- log "12"
  _log $ node 1 "div" "foo-bar" [] 4 [] "" ""
  log "f1234"
  log "main"
