module FFI where

import Data.Unit (Unit)

import Effect (Effect)

foreign import _log :: forall a. a -> Effect Unit
