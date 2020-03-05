module Main where

import Data.Unit (Unit)
import Effect (Effect)
-- import Effect.Console (log)
-- import FFI (_log)
import Jack.Html  as J

bar :: forall msg. J.Html msg
bar = J.text "fffgg"

foo :: forall msg. J.Html msg
foo = J.div "foo-bar" [bar] 4 [] "" ""

root :: J.HtmlElement
root = J.findElement "root"

main :: Effect Unit
main = do
  J.render foo root
  -- _log bar
  -- _log $ Jack.render foo root
  -- log "main"
