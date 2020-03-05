module Jack.Core where

import Jack.VNode (Node)
import Data.Function.Uncurried (Fn2, runFn2)

import Data.Unit (Unit)
import Effect (Effect)

data HtmlElement = HtmlElement

foreign import findElement :: String -> HtmlElement
foreign import render_ffi :: forall msg. Fn2 (Node msg) HtmlElement (Effect Unit)

render :: forall msg. Node msg -> HtmlElement -> Effect Unit
render = runFn2 render_ffi
