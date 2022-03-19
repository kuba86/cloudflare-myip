package com.kuba86.cloudflare.generate

import org.scalajs.dom.{FetchEvent, Request, Response, ResponseInit}

import scala.scalajs.js

object Main {
  def main(args: Array[String]): Unit = {
    Globals.addEventListener("fetch", (event: FetchEvent) => {
      event.respondWith(handleRequest(event.request))
    })
  }

  def handleRequest(request: Request): Response = {
    new Response(html(request), new ResponseInit {
      headers = js.Dictionary("content-type" -> "text/html")
    })
  }

  def html(request: Request): String = {
    val connectingIp = request.headers.get("cf-connecting-ip")
    val realIp = request.headers.get("x-real-ip")
    val country = request.headers.get("cf-ipcountry")
    s"""<!doctype html>
       |<html lang="en">
       |<head>
       |  <meta charset="utf-8">
       |  <meta name="viewport" content="width=device-width, initial-scale=1">
       |  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
       |  <title>My IP</title>
       |</head>
       |<body>
       |<div class="container">
       |
       |  <br>
       |  <h3>Connecting IP:</h3>
       |  <div class="row">
       |    <div class="col-9">
       |      <input class="form-control" type="text" id="connectingip" value="${connectingIp}" disabled>
       |    </div>
       |    <div class="col-1">
       |      <button class="btn btn-primary" type="button" onclick="copyTxt('connectingip');">Copy</button>
       |    </div>
       |  </div>
       |
       |  <br>
       |  <h3>Real IP:</h3>
       |  <div class="row">
       |    <div class="col-9">
       |      <input class="form-control" type="text" id="realip" value="${realIp}" disabled>
       |    </div>
       |    <div class="col-1">
       |      <button class="btn btn-primary" type="button" onclick="copyTxt('realip');">Copy</button>
       |    </div>
       |  </div>
       |
       |  <br>
       |  <h3>Country ISO:</h3>
       |  <div class="row">
       |    <div class="col-9">
       |      <input class="form-control" type="text" id="countryIso" value="${country}" disabled>
       |    </div>
       |    <div class="col-1">
       |      <button class="btn btn-primary" type="button" onclick="copyTxt('countryIso');">Copy</button>
       |    </div>
       |  </div>
       |</div>
       |<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
       |<script>
       |  function copyTxt(id) {
       |    const text = document.getElementById(id).value;
       |    navigator.clipboard.writeText(text);
       |  }
       |</script>
       |</body>
       |</html>
       |""".stripMargin
  }
}
