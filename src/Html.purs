module Html where

import VDom as VDom

type Html msg = VDom.Node msg

type Attribute msg = VDom.Attribute msg

node :: forall msg. String -> Array (Attribute msg) -> Array (Html msg) -> Html msg
node = VDom.node

text :: forall msg. String -> Html msg
text = VDom.text

div :: forall msg. Array (Attribute msg) -> Array (Html msg) -> Html msg
div = VDom.node "div"
