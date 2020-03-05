module Jack.Html where

import Effect (Effect)
import Jack.Core as Core
import Jack.VNode as VNode
import Data.Unit (Unit)

type Html msg = VNode.Node msg

type HtmlElement = Core.HtmlElement

-- node :: forall msg. String -> Array (Attribute msg) -> Array (Html msg) -> Html msg
-- node = VDom.node

-- text :: forall msg. String -> Html msg
-- text = VDom.text
findElement :: String -> HtmlElement
findElement = Core.findElement

text :: forall msg. String ->  Html msg
text = VNode.textNode


div :: forall msg a. String -> Array (Html msg) -> Int -> Array a -> String -> String -> Html msg
div = VNode.node "div"

render :: forall msg. Html msg -> HtmlElement -> Effect Unit
render = Core.render
