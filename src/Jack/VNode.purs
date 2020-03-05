module Jack.VNode where

import Data.Function.Uncurried (Fn7, runFn7)

data Node msg = Node

foreign import createVNode :: forall msg a. Fn7 String String (Array (Node msg)) Int (Array a) String String (Node msg)
foreign import textNode :: forall msg. String -> Node msg

node :: forall msg a. String -> String -> Array (Node msg) -> Int -> Array a -> String -> String -> Node msg
node = runFn7 createVNode

-- text :: forall msg a. String -> String -> Array (Node msg) -> Int -> Array a -> String -> String -> Node msg
-- text = runFn7 textNode
