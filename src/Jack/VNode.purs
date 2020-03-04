module Jack.VNode where

import Prelude
import Data.Function.Uncurried (Fn2, Fn3, Fn4, Fn8, runFn2, runFn3, runFn4, runFn8)
import Data.Tuple (Tuple)

data Node msg = Node


foreign import createVNode :: forall msg a. Fn8 Int String String (Array (Node msg)) Int (Array a) String String (Node msg)

node :: forall msg a. Int -> String -> String -> Array (Node msg) -> Int -> Array a -> String -> String -> Node msg
node = runFn8 createVNode
