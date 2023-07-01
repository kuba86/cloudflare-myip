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

https://domains.google.com/checkip
178.36.52.251

https://nordvpn.com/wp-admin/admin-ajax.php?action=get_user_info_data
{
  "coordinates": {
    "latitude": 52.2296,
    "longitude": 21.0067
  },
  "ip": "178.36.52.251",
  "isp": "Netia SA",
  "host": {
    "domain": "inetia.pl",
    "ip_address": "178.36.52.251",
    "prefix_len": 15
  },
  "status": false,
  "country": "Poland",
  "region": "Mazovia",
  "city": "Warsaw",
  "location": "Poland, Mazovia, Warsaw",
  "area_code": "00-510",
  "country_code": "PL"
}

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

https://hty0vel7odrv3p9derftv-dnscheck.adguard-dns.com/dnscheck/test
{"client_ip":"178.36.52.251","device_id":"eeba6d73","profile_id":"66f6cf15","server_group_name":"clients","server_name":"clients_doh","protocol":"doh","node_location":"ams","node_name":"dns2-dp-ams-2"}
{"client_ip":"84.17.55.154","device_id":"","profile_id":"","server_group_name":"regular","server_name":"regular_dns","protocol":"dns","node_location":"pra","node_name":"dns2-dp-pra-3"}

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
