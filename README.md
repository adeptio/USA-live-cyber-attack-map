# ThreatWave

[ThreatWave][threatwave] receives data on malicious internet traffic originating in the USA in real time, visualizes its path with Google Maps, and provides informative tables.

Information security companies install '[honeypots][honeypot]' (intentionally vulnerable networks) in various countries to
collect malware samples.  Honeypots appear to have valuable data, but in reality contain software to capture or log malware
activity.  Data of interest to a research honeypot could be origin IP, geolocation, protocol, and port.  Most of the data
provided to this application is the product of research honeypots staffed by various organizations.     

It is important to note that IPs can be [altered][spoof] easily - so origin data should not be taken as definitive.

ThreatWave is a personal project by Mike Brinkman.

![ThreatWave home page: https://adeptio.github.io/USA-live-cyber-attack-map/][home page]

## Features

- Google Maps API visualizes packet data:
  - Custom pins are dropped at attack origins in real time, and display attack info when clicked.
  - Lines with arrow animations are drawn between origin and target geolocation.  
- Feed shows JSON data as the app processes it.
- Tables show:
  - Top attackers based on origin of malicious packets.  (All tables update and sort in real time)
  - Top malware attack types.
  - Top countries targeted.
- Guided website tour shows new users how to view the app.  

## Project Design

ThreatWave was designed and built in three days.

A [proposal][proposal] was drafted to help provide an implementation timeline during the development process.

## Technology

ThreatWave is a single-page application built primarily with vanilla JavaScript and associated libraries.    

- [Frontend technology][frontend]

## Future Implementations

ThreatWave is only a few degrees above being considered an MVP.

The features that will be added are listed in the [future implementations][future] outline.

[threatwave]: https://adeptio.github.io/USA-live-cyber-attack-map/
[home page]: ./docs/images/page.png "ThreatWave home page"

[proposal]: ./docs/README_DEV.md

[frontend]: ./docs/frontend.md

[future]: ./docs/future.md


[spoof]: https://en.wikipedia.org/wiki/IP_address_spoofing
[honeypot]: https://en.wikipedia.org/wiki/Honeypot_(computing)
