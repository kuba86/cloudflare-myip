export default {
    async fetch(request, env, ctx) {
        const realIp = request.headers.get("x-real-ip");
        const connectingIp = request.headers.get("cf-connecting-ip");
        const url1 = `https://ipinfo.io/${realIp}?token=${env.ipinfo_token}`;

        async function apiCall(url) {
            const response = await fetch(url);
            const result = await response.text();
            return JSON.parse(result);
        }

        const json = await apiCall(url1);

        function getCurrentDateTimeInWarsaw() {
            const now = new Date();
            const options = {
                timeZone: 'Europe/Warsaw',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            };
            return now.toLocaleString('pl-PL', options);
        }

        await fetch('https://ntfy.kuba86.com/cloudflare-workers', {
            method: 'POST', // PUT works too
            headers: {
                'Authorization': `Bearer ${env.ntfy_token}`,
                'Title': `MyIP | ${realIp}`,
                'Priority': 'low',
                'Tags': 'cloudflare,myip'
            },
            body:
                `${getCurrentDateTimeInWarsaw()}\n`+
                `IP: ${realIp}\n`+
                `Organization: ${json.org}\n`+
                `Hostname: ${json.hostname}\n`+
                `Country: ${json.country}\n`+
                `Region: ${json.region}\n`+
                `City: ${json.city}\n`+
                `Postal: ${json.postal}\n`+
                `Timezone: ${json.timezone}`
        })

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
              <row>
                <label for="connectingip" class="form-label pt-2">Connecting IP</label>
              </row>
              <div class="row">
                <div class="col-9">
                  <input class="form-control form-control-sm" type="text" id="connectingip" value="${connectingIp}" disabled>
                </div>
                <div class="col-1 align-self-center">
                  <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('connectingip');">Copy</button>
                </div>
              </div>
              <row>
                <label for="realip" class="form-label pt-2">Real IP</label>
              </row>
              <div class="row">
                <div class="col-9">
                  <input class="form-control form-control-sm" type="text" id="realip" value="${realIp}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('realip');">Copy</button>
                </div>
              </div>
              <row>
                <label for="organization" class="form-label pt-2">Organization</label>
              </row>
              <div class="row">
                <div class="col-9">
                  <input class="form-control form-control-sm" type="text" id="organization" value="${json.org}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('organization');">Copy</button>
                </div>
              </div>
              <row>
                <label for="hostname" class="form-label pt-2">Hostname</label>
              </row>
              <div class="row">
                <div class="col-9">
                  <input class="form-control form-control-sm" type="text" id="hostname" value="${json.hostname}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('hostname');">Copy</button>
                </div>
              </div>
              <row>
                <label for="countryIso" class="form-label pt-2">Country iso</label>
              </row>
              <div class="row">
                <div class="col-9">
                  <input class="form-control form-control-sm" type="text" id="countryIso" value="${json.country}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('countryIso');">Copy</button>
                </div>
              </div>
              <row>
                <label for="region" class="form-label pt-2">Region</label>
              </row>
              <div class="row">
                <div class="col-9">
                  <input class="form-control form-control-sm" type="text" id="region" value="${json.region}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('region');">Copy</button>
                </div>
              </div>
              <row>
                <label for="city" class="form-label pt-2">City</label>
              </row>
              <div class="row">
                <div class="col-9">
                  <input class="form-control form-control-sm" type="text" id="city" value="${json.city}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('city');">Copy</button>
                </div>
              </div>
              <row>
                <label for="area_code" class="form-label pt-2">Area Code</label>
              </row>
              <div class="row">
                <div class="col-9">
                  <input class="form-control form-control-sm" type="text" id="area_code" value="${json.postal}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('area_code');">Copy</button>
                </div>
              </div>
              <row>
                <label for="timezone" class="form-label pt-2">Timezone</label>
              </row>
              <div class="row">
                <div class="col-9">
                  <input class="form-control form-control-sm" type="text" id="timezone" value="${json.timezone}" disabled>
                </div>
                <div class="col-1">
                  <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('timezone');">Copy</button>
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
                "content-type": "text/html;charset=UTF-8",
            },
        });
    },
};
