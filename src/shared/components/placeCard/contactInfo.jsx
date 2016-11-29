/* eslint max-len: [2, 500, 4] */
import React from 'react';
import PlaceController from '../../../client/controllers/placeController';
import GaUtil from '../../utils/gaUtil';

export default class ContactInfo extends React.Component {

  constructor() {
    super();
    this.clickTelHandler = this.clickTelHandler.bind(this);
    this.clickWebsiteHandler = this.clickWebsiteHandler.bind(this);
    this.clickAddressHandler = this.clickAddressHandler.bind(this);
  }

  clickTelHandler() {
    GaUtil.sendEvent('place', 'click_telephone', `click_telephone::${this.props.data.placeId}::${this.props.data.google.name}`);
  }

  clickWebsiteHandler(event) {
    const { google } = this.props.data;
    window.open(google.website);
    GaUtil.sendEvent('place', 'click_website', `click_website::${this.props.data.placeId}::${this.props.data.google.name}`);
    event.preventDefault();
  }

  clickAddressHandler(event) {
    const { google } = this.props.data;
    window.open(google.url);
    GaUtil.sendEvent('place', 'click_address', `click_address::${this.props.data.placeId}::${this.props.data.google.name}`);
    event.preventDefault();
  }

  render() {
    const { google } = this.props.data;
    return (<div>
      { google && google.international_phone_number ? <div>
        <i className="glyphicon glyphicon-earphone" />
        <a href={`tel:${google.international_phone_number}`} title={google.name} onClick={this.clickTelHandler}>
          {PlaceController.cleanPhone(google.international_phone_number)}
        </a>
      </div> : null }
      { google && google.website ? <div>
        <i className="glyphicon glyphicon-home" />
        <a href={google.website} title={google.name} target="_blank" rel="noopener noreferrer" onClick={this.clickWebsiteHandler}>
          {PlaceController.cleanWebsite(google.website)}
        </a>
      </div> : null }
      { google && google.formatted_address ? <div>
        <i className="glyphicon glyphicon-globe" />
        <a href={google.url} title={google.name} target="_blank" rel="noopener noreferrer" onClick={this.clickAddressHandler}>
          {PlaceController.cleanAddress(google.formatted_address)}
        </a>
      </div> : null }
    </div>);
  }
}

ContactInfo.propTypes = {
  data: React.PropTypes.shape({
    google: React.PropTypes.object,
    facebook: React.PropTypes.array,
    foursquare: React.PropTypes.array,
    placeId: React.PropTypes.string,
    types: React.PropTypes.array,
  }),
};
