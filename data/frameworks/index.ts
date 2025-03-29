import type { Framework } from "./types"
import { javascriptFrameworks } from "./js"
import { cssFrameworks } from "./css"
import { javaFrameworks } from "./java"
import { goFrameworks } from "./go"
import { pythonFrameworks } from "./python"
import { cppFrameworks } from "./cpp"
import { rubyFrameworks } from "./ruby"
import { swiftFrameworks } from "./swift"
import { rustFrameworks } from "./rust"
import { rFrameworks } from "./r"
import { dartFrameworks } from "./dart"
import { elixirFrameworks } from "./elixir"
import { elmFrameworks } from "./elm"
import { fsharpFrameworks } from "./fsharp"
import { coffeescriptFrameworks } from "./coffeescript"
import { csharpFrameworks } from "./csharp"
import { phpFrameworks } from "./php"
import { kotlinFrameworks } from "./kotlin"
import { scalaFrameworks } from "./scala"
import { haskellFrameworks } from "./haskell"
import { clojureFrameworks } from "./clojure"
import { juliaFrameworks } from "./julia"
import { cobolFrameworks } from "./cobol"
import { luaFrameworks } from "./lua"
import { objectivecFrameworks } from "./objectivec"
import { fortranFrameworks } from "./fortran"
import { prologFrameworks } from "./prolog"
import { matlabFrameworks } from "./matlab"
import { vbaFrameworks } from "./vba"
import { perlFrameworks } from "./perl"
import { lispFrameworks } from "./lisp"
import { racketFrameworks } from "./racket"
import { erlangFrameworks } from "./erlang"
import { ocamlFrameworks } from "./ocaml"
import { nimFrameworks } from "./nim"
import { cFrameworks } from "./c"
import { lessFrameworks } from "./less"
import { purescriptFrameworks } from "./purescript"

// Exporter tous les frameworks dans un seul objet
export const frameworksData: Record<string, Framework> = {
  ...javascriptFrameworks,
  ...cssFrameworks,
  ...javaFrameworks,
  ...goFrameworks,
  ...pythonFrameworks,
  ...cppFrameworks,
  ...rubyFrameworks,
  ...swiftFrameworks,
  ...rustFrameworks,
  ...rFrameworks,
  ...dartFrameworks,
  ...elixirFrameworks,
  ...elmFrameworks,
  ...fsharpFrameworks,
  ...coffeescriptFrameworks,
  ...csharpFrameworks,
  ...phpFrameworks,
  ...kotlinFrameworks,
  ...scalaFrameworks,
  ...haskellFrameworks,
  ...clojureFrameworks,
  ...juliaFrameworks,
  ...cobolFrameworks,
  ...luaFrameworks,
  ...objectivecFrameworks,
  ...fortranFrameworks,
  ...prologFrameworks,
  ...matlabFrameworks,
  ...vbaFrameworks,
  ...perlFrameworks,
  ...lispFrameworks,
  ...racketFrameworks,
  ...erlangFrameworks,
  ...ocamlFrameworks,
  ...nimFrameworks,
  ...cFrameworks,
  ...lessFrameworks,
  ...purescriptFrameworks,
}

