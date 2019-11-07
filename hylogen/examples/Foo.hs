{-# LANGUAGE DataKinds #-}
module Foo where
import qualified System.Random as Random
import System.IO.Unsafe (unsafePerformIO)
-- import Hylogen.WithHy
import Hylogen.WithHylide
import Data.Profunctor (lmap, Profunctor(..),Forget(..))
import Hylogen.Expr (toGLSLType)
output = toProgram color

color :: Vec4
color = vec4 (10*10, 10*10, f time * 100, 10*10)
  where
    k = 20
    f = (*k) . sin . (/k)
    a = sum [ cos (x_ uvN * f time * 900 +  osc1 ) -- rn 9 ) 
            , sin (y_ uvN * f time * 900 +  osc1 ) -- rn 9 ) 
            ]
    flash = f time

-- rn :: Integer -> FloatVec n -> Vec 1
rn a v = fromInteger $ unsafePerformIO $ do
    x <- Random.getStdRandom (Random.randomR (0,a))
    print x
    print  v
    return $  abs x


