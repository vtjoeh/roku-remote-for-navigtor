# roku-remote-for-navigtor
Roku Remote v0.1
Purpose: A simple Roku remote for the Cisco Navigator touch panel on a Cisco video device. 

Notes: 
- IP Address of Roku needs to be hard coded into the macro. 
- Roku does not support static ip addresses. Set a DHCP Reservation for the Roku device on the router or DHCP server. 
- HDCP HDMI required. To enable HDCP and supported Cisco video devices see: https://help.webex.com/en-us/article/niew98v/Enable-HDCP-protected-content-on-Board-and-Room-Series
- Set the IPADDRESS and ROKU_HDMI_IN variables in the macro

The macro will set: 
> xConfiguration HttpClient AllowHTTP: True

let author = "joehughe" + "@" + "cisco.com"

<img width="420" alt="RokuRemote" src="https://github.com/vtjoeh/roku-remote-for-navigtor/assets/16569532/2515c526-e355-4f99-a7f6-8f2f2e11d5b9">
