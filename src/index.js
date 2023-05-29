/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
    
        const realIp = request.headers.get("x-real-ip");
        const connectingIp = request.headers.get("cf-connecting-ip");
        const url1 = 'https://nordvpn.com/wp-admin/admin-ajax.php?action=get_user_info_data&ip='+realIp;
        const response = await fetch(url1);
        const result = await response.text();
        const json = JSON.parse(result);
        const html = `<!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha256-wLz3iY/cO4e6vKZ4zRmo4+9XDpMcgKOvv/zEU3OMlRo=" crossorigin="anonymous">
          <title>My IP</title>
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
          <h3>ISP:</h3>
          <div class="row">
            <div class="col-9">
              <input class="form-control" type="text" id="isp" value="${json.isp}" disabled>
            </div>
            <div class="col-1">
              <button class="btn btn-primary" type="button" onclick="copyTxt('isp');">Copy</button>
            </div>
          </div>
          <br>
          <h3>Host domain:</h3>
          <div class="row">
            <div class="col-9">
              <input class="form-control" type="text" id="host-domain" value="${json.host.domain}" disabled>
            </div>
            <div class="col-1">
              <button class="btn btn-primary" type="button" onclick="copyTxt('host-domain');">Copy</button>
            </div>
          </div>
          <br>
          <h3>Country ISO:</h3>
          <div class="row">
            <div class="col-9">
              <input class="form-control" type="text" id="countryIso" value="${json.country_code}" disabled>
            </div>
            <div class="col-1">
              <button class="btn btn-primary" type="button" onclick="copyTxt('countryIso');">Copy</button>
            </div>
          </div>
          <br>
          <h3>Country:</h3>
          <div class="row">
            <div class="col-9">
              <input class="form-control" type="text" id="countryName" value="${json.country}" disabled>
            </div>
            <div class="col-1">
              <button class="btn btn-primary" type="button" onclick="copyTxt('countryName');">Copy</button>
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
              <input class="form-control" type="text" id="area_code" value="${json.area_code}" disabled>
            </div>
            <div class="col-1">
              <button class="btn btn-primary" type="button" onclick="copyTxt('area_code');">Copy</button>
            </div>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha256-lSABj6XYH05NydBq+1dvkMu6uiCc/MbLYOFGRkf3iQs=" crossorigin="anonymous"></script>
        <script>
          function copyTxt(id) {
            const email = document.getElementById(id).value;
            navigator.clipboard.writeText(email);
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
