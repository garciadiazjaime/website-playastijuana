import React from 'react';
import { Link } from 'react-router';

const style = process.env.NODE_ENV === 'DEV' ? require('./style.scss') : {};
import menuData from '../../../../menuData';
// import Sprites from '../../../../sprite';


export default class FooterAAA extends React.Component {

  getMenu(data, className) {
    const items = data.map((item, index) => {
      const children = item.children ? this.getMenu(item.children) : null;

      return (<li key={index} className={className || style.menuChild}>
        {
          item.type ?
          <a href={item.url} target="_blank">{item.title}</a> :
          <Link to={item.url}>{item.title}</Link>
        }
        {children}
      </li>);
    }, this);

    return (<ul>{items}</ul>);
  }

  getAddress(data) {
    const items = data.map((item, index) => {
      return (<div className="col-sm-4" key={index}>
        <div className="row">
          [address]
        </div>
      </div>);
    });

    return (<div id={style.addresses} className="hidden-sm hidden-xs">{items}</div>);
  }

  render() {
    const data = [{
      name: 'POOL',
      url: 'http://somospool.com',
      title: 'somos pool',
    }, {
      name: 'MINT',
      url: 'http://mintitmedia.com',
      title: 'Diseño y Desarrollo Web en Tijuana',
    }];

    return (<div id={style.footer}>

        <div className="container">
          <div className={style.footerWrapper}>

            <div className="row">
              <div className="col-sm-8 col-xs-5">
                <div className="row">
                  [logo]
                </div>
              </div>
              <div className="col-sm-4 col-xs-6">
                <div className={style.followUs}>
                  [sm]
                </div>
              </div>
            </div>

            <div className="row">
              <div className={style.footerMenu}>
                {this.getMenu(menuData.items, style.menuParent)}

                {this.getAddress(menuData.addresses)}
              </div>
            </div>

          </div>
        </div>

        <div className={style.powered}>
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                Todos los derechos reservados Branding Pool 2015
              </div>
              <div className="col-sm-5">
                Un proyecto de:&nbsp;
                <a href={data[0].url} title={data[0].title} target="_blank">{data[0].name}</a>
                &nbsp;&nbsp;
                Código por:&nbsp;
                <a href={data[1].url} title={data[1].title} target="_blank">{data[1].name}</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
