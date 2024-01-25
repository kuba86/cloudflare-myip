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
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" integrity="sha384-Ay26V7L8bsJTsX9Sxclnvsn+hkdiwRnrjZJXqKmkIDobPgIIWBOVguEcQQLDuhfN" crossorigin="anonymous">
          <title>My IP - 0.0.4</title>
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
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js" integrity="sha384-NXgwF8Kv9SSAr+jemKKcbvQsz+teULH/a5UNJvZc6kP47hZgl62M1vGnw6gHQhb1" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script>
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
