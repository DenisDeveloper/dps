module FFI where

import Prelude

import Effect (Effect)

foreign import _log :: forall a. a -> Effect Unit
