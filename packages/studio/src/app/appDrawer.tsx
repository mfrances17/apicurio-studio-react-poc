import React from 'react';
import { Drawer, DrawerPanelContent, DrawerContent } from '@patternfly/react-core/dist/esm/experimental';
import AppDataList from './appDataList';
import {AppCardView} from './appCardView';
import AppDrawerPanelContent from './appDrawerPanelContent';
import './app.css';
import { Services } from './common'
import {Api} from "@apicurio/models";
import { ApisService } from '@apicurio/services';

interface AppDrawerProps {
  apiView: string
}

interface AppDrawerState {
  readonly currentApiId: string,
  readonly isExpanded: boolean
}

class AppDrawer extends React.Component<AppDrawerProps, AppDrawerState> {
  private apisService: ApisService;
  constructor(props: AppDrawerProps) {
    super(props);
    this.apisService = Services.getInstance().apisService;
    this.state = {
      //allApis: string[],
      currentApiId: "",
      isExpanded: false
    };
  }

  public allApis: Api[] = [];

  componentDidMount() {
    console.log('did it get here');
    this.loadAsyncPageData();
  }

  loadAsyncPageData(): void {
    this.apisService.getApis().then( apis => {
      debugger;
      this.allApis = apis;
      })
      .catch(error => {
        console.error("error getting API" + error);
      });
  }

  private openDrawer = () => {
    const isExpanded = !this.state.isExpanded;
    this.setState({
      isExpanded
    });
  };

  private findKey = (id: string) => {
    const keyListItem = id;
    this.setState({
      currentApiId: keyListItem
    })
  }

 render() {
   const { isExpanded, currentApiId } = this.state;

   return (
    <React.Fragment>
      <Drawer isExpanded={isExpanded} isInline>
        <DrawerContent>
          <div className="app-drawer-content">
            { this.props.apiView === 'list' ?
              <AppDataList keyListItem={this.findKey} selectItem={this.openDrawer} viewDetails={this.openDrawer}/>
            :
            <AppCardView/>
          }
          </div>
        </DrawerContent>
        <DrawerPanelContent className="app-drawer-panel-body">
          <AppDrawerPanelContent currentApiId={currentApiId}/>
        </DrawerPanelContent>
      </Drawer>
    </React.Fragment>
    );
 }
}

export default AppDrawer;