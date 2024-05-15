# roku-remote-for-navigtor
Roku Remote v0.1
Purpose: A simple Roku remote for the Cisco Navigator touch panel on a Cisco video device. 

Notes: 
- IP Address of Roku needs to be hard coded into the macro. 
- Roku does not support static ip addresses. Set a DHCP Reservation for the Roku device on the router or DHCP server. 
- HDCP HDMI required. To enable HDCP and supported Cisco video devices see: https://help.webex.com/en-us/article/niew98v/Enable-HDCP-protected-content-on-Board-and-Room-Series
- Set the IPADDRESS and ROKU_HDMI_IN variables in the macro

let author = "joehughe" + "@" + "cisco.com"

The macro will set: xConfiguration HttpClient AllowHTTP: True
