import * as React from 'react';
import { Media } from 'react-md/lib/Media';
import { Card as MDCard, CardTitle } from 'react-md/lib/Cards';
import TooltipFontIcon from '../Tooltip/TooltipFontIcon';
import Button from 'react-md/lib/Buttons';
import { Settings, SettingsActions } from './Settings';
import { SpinnerActions } from '../Spinner';

interface ICardProps {
  id?: string;
  title?: string;
  subtitle?: string;
  widgets?: React.ReactNode;
  titleStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

interface ICardState {
  hover: boolean;
}

export default class Card extends React.PureComponent<ICardProps, ICardState> {

  state = {
    hover: false,
  };

  constructor(props: ICardProps) {
    super(props);
  }
  
  render() {
    const { id, title, subtitle, children, titleStyle, contentStyle } = this.props;
    const { hover } = this.state;

    let elements: React.ReactNode[] = [];
    if (title) {
      elements.push(
        <span key={0}>{title}</span>
      );
    }
    if (subtitle) {
      elements.push(
        <TooltipFontIcon
          key={1}
          tooltipLabel={subtitle}
          tooltipPosition="top"
          forceIconFontSize={true}
          forceIconSize={16}
          className="card-icon"
        >
          info
        </TooltipFontIcon>
      );
    }
    if (hover) {
      elements.push( this.renderWidgets() );
    }
    
    return (
      <MDCard onMouseOver={() => this.setState({ hover: true })} onMouseLeave={() => this.setState({ hover: false })}>
        <CardTitle title="" subtitle={elements} style={titleStyle} />
        <Media style={contentStyle}>
          {children}
        </Media>
      </MDCard>
    );
  }

  renderWidgets() {
    const { id, title, widgets } = this.props;

    const settingsButton = (
      <Button
        icon
        key="settings"
        onClick={() => SettingsActions.openDialog(title, id)}
        className="card-settings-btn"
      >
        settings
      </Button>
    );

    return !widgets ? (
      <div className="card-settings" key="widgets">
        {settingsButton}
      </div> 
    ) : (
      <div className="card-settings" key="widgets">
        <span>{widgets}</span>
        <span>{settingsButton}</span>
      </div>
    );
  }

}