import React from "react";

type BadgePropsDefault = {text: string};
type BadgeProps = BadgePropsDefault & {bg: "primary" | "secondary"};

export default function Badge({text, bg}: BadgeProps) {
    return (<span className={`badge text-bg-${bg}`}>{text}</span>);
}

export function PrimaryBadge({text}: BadgePropsDefault) {
    return (<Badge text={text} bg={"primary"} />);
}

export function SecondaryBadge({text}: BadgePropsDefault) {
    return (<Badge text={text} bg={"secondary"} />);
}
