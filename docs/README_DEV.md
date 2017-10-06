# USA-live-cyber-attack-map
Origin of attack === USA

## Background & Overview

This application receives data on malicious internet traffic originating in the USA in real time (RT), visualizes its origin with Google Maps, and provides informative tables.

Information security companies install '[honeypots][honeypot]' (intentionally vulnerable networks) in various countries to
collect malware samples.  Honeypots appear to have valuable data, but in reality contain software to capture or log malware
activity.  Data of interest to a research honeypot could be origin IP, geolocation, protocol, and port.  Most of the data
provided to this application is the product of research honeypots staffed by various organizations.     

It is important to note that IPs can be [altered][spoof] easily - so origin data should not be taken as definitive.  

## Functionality & MVP

- Google map drops custom points at attack origins in real time.  Points display attack info when clicked.  
- Feed shows JSON data in RT.
- Table shows 'top attackers' based on origin of malicious traffic.  (All tables update and sort in RT)
- Table shows top malware attack types.
- Table shows top countries targeted.        

## Snapshot

All data for the app will come from the RT feed, the site will consist of one main page.    

![page][page]

## Implementation Timeline

Over the weekend:

- Set up Satori RT feed
  - Get permanent API keys
  - Filter data appropriately    

Day 1:

- Create logic for data tables
- Overall CSS

Day 2:

- Research Google Maps Javascript API

Day 3-4:

- Implement Google Maps visualization for RT data
- Polishing of visualization and CSS

[honeypot]: https://en.wikipedia.org/wiki/Honeypot_(computing)
[spoof]: https://en.wikipedia.org/wiki/IP_address_spoofing
[page]: ./images/page.png "main page"
