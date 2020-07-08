import React from 'react';
import styled from 'styled-components';

import { SideMenu,  SideMenuItem } from './side_menu.js';

class StatsMenu extends React.Component {



  render() {

    return (
      <SideMenu>
        <SideMenuItem
          title="circles" />
        <SideMenuItem
          title="vario" />

      </SideMenu>
    )
  }
}


export default StatsMenu;