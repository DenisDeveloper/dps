module VDom where

-- import Data.Unit (Unit)
import Prelude
import Data.Function.Uncurried (Fn2, Fn3, Fn4, runFn2, runFn3, runFn4)
import Data.Tuple (Tuple)
-- import Effect.Uncurried (Fn2)


data Node msg = Node
data Attribute msg = Attribute


foreign import dLog :: forall a. a -> String
foreign import text :: forall msg. String -> Node msg
foreign import noScript :: String -> String
foreign import nodeNSImpl :: forall msg a. Fn4 String String (Array (Attribute msg)) (Array a) (Node msg)
foreign import nodeImpl :: forall msg a. Fn3 String (Array a) (Array (Node msg)) (Node msg)
foreign import keyedNodeNSImpl :: forall msg a. Fn4 String String (Array (Attribute msg)) (Array a) (Node msg)
foreign import keyedNodeImpl :: forall msg a. Fn3 String (Array a) (Array (Tuple String (Node msg))) (Node msg)

foreign import styleImpl :: forall msg. Fn2 String String (Attribute msg)
foreign import propertyImpl :: forall msg. Fn2 String String (Attribute msg)


nodeNS :: forall msg. String -> String -> Array (Attribute msg) -> Array (Node msg) -> Node msg
nodeNS ns tag = runFn4 nodeNSImpl ns $ noScript tag

node :: forall msg. String -> Array (Attribute msg) -> Array (Node msg) -> Node msg
node = runFn3 nodeImpl <<< noScript

keyedNodeNS :: forall msg. String -> String -> Array (Attribute msg) -> Array (Node msg) -> Node msg
keyedNodeNS ns tag = runFn4 keyedNodeNSImpl ns $ noScript tag

keyedNode :: forall msg. String -> Array (Attribute msg) -> Array (Tuple String (Node msg)) -> Node msg
keyedNode = runFn3 keyedNodeImpl <<< noScript

-- keyedNode : String -> List (Attribute msg) -> List ( String, Node msg ) -> Node msg
-- node : String -> List (Attribute msg) -> List (Node msg) -> Node msg

-- nodeNS : String -> String -> List (Attribute msg) -> List (Node msg) -> Node msg
-- keyedNodeNS : String -> String -> List (Attribute msg) -> List ( String, Node msg ) -> Node msg

style :: forall msg. String -> String -> Attribute msg
style = runFn2 styleImpl

property :: forall msg. String -> String -> Attribute msg
property key value = runFn2 propertyImpl key value
