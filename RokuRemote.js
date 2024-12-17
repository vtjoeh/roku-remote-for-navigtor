/*
Roku Remote v0.1
Purpose: Simple Roku remote from the Cisco Navigatgor touchpnael. 

- IP Address of Roku needs to be hard coded into the macro. 
- Roku does not support static ip addresses. Set a DHCP Reservation for the Roku device on the router or DHCP server. 
- To enable HDCP and supported Cisco video devices see: https://help.webex.com/en-us/article/niew98v/Enable-HDCP-protected-content-on-Board-and-Room-Series
- Set the IPADDRESS and ROKU_HDMI_IN 

let author = "joehughe" + "@" + "cisco.com"

Macro will set: xConfiguration HttpClient AllowHTTP: True

License: MIT LICENSE 
Github: https://github.com/vtjoeh
*/

import xapi from 'xapi';

/* update the following two variables below */

const IPADDRESS = '192.168.1.113'; // IP Address of Roku device

const ROKU_HDMI_IN = "3"; // input Roku is on for the Cisco video device.  This input should should support HDCP.

/* ***************************************** */

const ROKU_DIRECTIONAL_PAD = 'widget_directionalPad_roku';

const ROKU_PANEL = 'panel_roku_remote';

const ROKU_CLOSE_WIDGET = 'widgetRoku_close';

let urlBase = 'http://' + IPADDRESS + ':8060/'

xapi.Config.HttpClient.AllowHTTP.set('True'); // turn on allow HTTP communication to Roku device

async function panelClicked(event) {
  if (ROKU_PANEL === event.PanelId) {
    await xapi.Command.Presentation.Start({ ConnectorId: ROKU_HDMI_IN });
    xapi.Command.UserInterface.Extensions.Panel.Open({ PanelId: ROKU_PANEL });
  }
}

async function guiEvent(event) {
  const regexKey = /widget_roku_(.+)/;

  const keyMatch = event.WidgetId.match(regexKey);

  if (keyMatch != null) {
    if (event.Type === 'pressed') {
      console.log('key pressed', keyMatch[1]);
      // sendRemoteControlKeyCommand(keyMatch[1]);
      sendKey('keydown', keyMatch[1]);
    }
    else if (event.Type === 'released') {
      sendKey('keyup', keyMatch[1]);
    }
  }

  if (event.WidgetId === ROKU_DIRECTIONAL_PAD) {

    let keyPad = event.Value;

    if (keyPad === 'center') {
      keyPad = 'Select';
    }

    if (event.Type === 'pressed') {
      sendKey('keydown', keyPad);
    }
    else if (event.Type === 'released') {
      sendKey('keyup', keyPad);
    }
  }

  if (event.WidgetId === ROKU_CLOSE_WIDGET && event.Type === 'pressed') {
    await xapi.Command.Presentation.Stop();
    sendKey('keypress', 'Home');
    xapi.Command.UserInterface.Extensions.Panel.Close();
  }

}

async function sendKey(upDown, key) {
  let body = ''; // blank body for Posts
  let url = urlBase + upDown + '/' + key;
  
  xapi.Command.HttpClient.Post({
    "URL": url,
  }, body).catch((error) => {
    console.error(error);
  });
}

xapi.Event.UserInterface.Extensions.Panel.Clicked.on(panelClicked);

xapi.Event.UserInterface.Extensions.Widget.Action.on(guiEvent);
