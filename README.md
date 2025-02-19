# MyIP

# How to

## Prepare workspace

1. install nodejs `sudo dnf install nodejs`
2. `npm install wrangler`

## Run locally

1. `wrangler dev --remote`

## Deploy to Cloudflare

1. `wrangler deploy`

```shell
https://cloudflare.com/cdn-cgi/trace
fl=73f258
h=cloudflare.com
ip=178.36.52.251
ts=1688202468.494
visit_scheme=https
uag=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
colo=WAW
sliver=none
http=http/2
loc=PL
tls=TLSv1.3
sni=plaintext
warp=off
gateway=off
rbi=off
kex=X25519

https://ipv4.am.i.mullvad.net/json
{
  "ip": "178.36.52.251",
  "country": "Poland",
  "city": "Warsaw",
  "longitude": 21.0067,
  "latitude": 52.2296,
  "mullvad_exit_ip": false,
  "blacklisted": {
    "blacklisted": false,
    "results": [
      {
        "name": "Project Honeypot",
        "link": "https://www.projecthoneypot.org/about_us.php",
        "blacklisted": false
      },
      {
        "name": "Spamhaus",
        "link": "https://www.spamhaus.org/organization/",
        "blacklisted": false
      }
    ]
  },
  "organization": "Netia SA"
}

https://spacecom.cc/ip
{
    "ip": "84.17.55.154",
    "country_code": "PL",
    "country_name": "Poland",
    "lat": 52.22960,
    "lon": 21.00670,
    "icon": "PL.png",
    "city": "Warsaw",
    "protected": false
}
```
