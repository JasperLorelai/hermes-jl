import React from "react";

type BadgeBG = "primary" | "secondary";

export default class Badge extends React.Component<{bg: BadgeBG, text: any}, any> {

    render() {
        const {bg, text} = this.props;
        return (
            <span className={`badge text-bg-${bg}`}>{text}</span>
        );
    }

}

export class PrimaryBadge extends React.Component<{text: string}, any> {

    render() {
        return <Badge bg="primary" text={this.props.text} />;
    }

}

export class SecondaryBadge extends React.Component<{text: string}, any> {

    render() {
        return <Badge bg="secondary" text={this.props.text} />;
    }

}