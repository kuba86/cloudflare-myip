export default {
    async fetch(request, env, ctx) {
        const realIp = request.headers.get("x-real-ip");
        const connectingIp = request.headers.get("cf-connecting-ip");
        const url1 = `https://ipinfo.io/${realIp}?token=${env.ipinfo_token}`;
        const response = await fetch(url1);
        const result = await response.text();
        const json = JSON.parse(result);
        const html = `<!doctype html>
            <html lang="en" xmlns="http://www.w3.org/1999/html">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha256-PI8n5gCcz9cQqQXm3PEtDuPG8qx9oFsFctPg0S5zb8g=" crossorigin="anonymous">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" integrity="sha256-9kPW/n5nn53j4WMRYAxe9c1rCY96Oogo/MKSVdKzPmI=" crossorigin="anonymous">
              <title>My IP - 1.0.0</title>
            </head>
            <body>
            <div class="container">
              <br>
              <h3>Connecting IP:</h3>
              <div class="row">
                <div class="col-9">
                  <input class="form-control" type="text" id="connectingip" value="${connectingIp}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary" type="button" onclick="copyTxt('connectingip');">Copy</button>
                </div>
              </div>
              <br>
              <h3>Real IP:</h3>
              <div class="row">
                <div class="col-9">
                  <input class="form-control" type="text" id="realip" value="${realIp}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary" type="button" onclick="copyTxt('realip');">Copy</button>
                </div>
              </div>
              <br>
              <h3>Organization:</h3>
              <div class="row">
                <div class="col-9">
                  <input class="form-control" type="text" id="organization" value="${json.org}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary" type="button" onclick="copyTxt('organization');">Copy</button>
                </div>
              </div>
              <br>
              <h3>Hostname:</h3>
              <div class="row">
                <div class="col-9">
                  <input class="form-control" type="text" id="hostname" value="${json.hostname}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary" type="button" onclick="copyTxt('hostname');">Copy</button>
                </div>
              </div>
              <br>
              <h3>Country ISO:</h3>
              <div class="row">
                <div class="col-9">
                  <input class="form-control" type="text" id="countryIso" value="${json.country}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary" type="button" onclick="copyTxt('countryIso');">Copy</button>
                </div>
              </div>
              <br>
              <h3>Region:</h3>
              <div class="row">
                <div class="col-9">
                  <input class="form-control" type="text" id="region" value="${json.region}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary" type="button" onclick="copyTxt('region');">Copy</button>
                </div>
              </div>
              <br>
              <h3>City:</h3>
              <div class="row">
                <div class="col-9">
                  <input class="form-control" type="text" id="city" value="${json.city}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary" type="button" onclick="copyTxt('city');">Copy</button>
                </div>
              </div>
              <br>
              <h3>Zip Code:</h3>
              <div class="row">
                <div class="col-9">
                  <input class="form-control" type="text" id="area_code" value="${json.postal}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary" type="button" onclick="copyTxt('area_code');">Copy</button>
                </div>
              </div>
              <br>
              <h3>Timezone:</h3>
              <div class="row">
                <div class="col-9">
                  <input class="form-control" type="text" id="timezone" value="${json.timezone}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary" type="button" onclick="copyTxt('timezone');">Copy</button>
                </div>
              </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha256-CDOy6cOibCWEdsRiZuaHf8dSGGJRYuBGC+mjoJimHGw=" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha256-Nn1q/fx0H7SNLZMQ5Hw5JLaTRZp0yILA/FRexe19VdI=" crossorigin="anonymous"></script>
            <script>
              function copyTxt(id) {
                const id_value = document.getElementById(id).value;
                navigator.clipboard.writeText(id_value);
              }
            </script>
            </body>
            </html>
            `;
        return new Response(html, {
            headers: {
                'content-type': 'text/html;charset=UTF-8',
            },
        });
    },
};
