ThisBuild / version := "1.0.0"

ThisBuild / scalaVersion := "2.13.10"

enablePlugins(ScalaJSPlugin)

libraryDependencies ++= Seq(
  "org.scala-js" %% "scalajs-library" % "1.12.0",
  "org.scala-js" %%% "scalajs-dom" % "2.3.0"
)

scalaJSUseMainModuleInitializer := true

Compile / fullOptJS / artifactPath := baseDirectory.value / "index.js"

lazy val root = (project in file("."))
  .settings(
    name := "myip",
    idePackagePrefix := Some("com.kuba86.cloudflare.generate")
  )
