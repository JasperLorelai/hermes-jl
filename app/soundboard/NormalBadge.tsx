import React from "react";

export default class Badge extends React.Component<any, any> {

    render() {
        return (<span className="badge text-bg-primary">{this.props.text}</span>);
    }

}
