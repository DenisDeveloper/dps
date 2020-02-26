module Html.Attributes where

import Html (Attribute)
import VDom as VDom

style :: forall msg. String -> String -> Attribute msg
style = VDom.style
