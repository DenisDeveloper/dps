module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import FFI (_log)
import Html (div)
import Html.Attributes (style)

main :: Effect Unit
main = do
  -- log "12"
  _log $ div [style "width" "12px"] []
  log "main"
