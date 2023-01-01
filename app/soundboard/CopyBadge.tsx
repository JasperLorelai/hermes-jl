"use client";

import "../../styles/general.css";

import React from "react";
import {Toast} from "bootstrap";

export default class CopyBadge extends React.Component<any, any> {

    render() {
        const text = this.props.text;
        return (
            <span className="badge text-bg-secondary tooltip-badge custom-tooltip copy-badge"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  data-bs-title="Click to copy."
                  onClick={() => {
                      navigator.clipboard.writeText(text).then();
                      const toastElement = document.getElementById("liveToast");
                      if (!toastElement) return;
                      new Toast(toastElement).show();
                  }}
            >{text}</span>
        );
    }

}
