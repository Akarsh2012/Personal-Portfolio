import React from "react";

/*
 * Architecture diagrams, laid out with CSS flow rather than fixed SVG
 * coordinates. A pipeline runs left-to-right on desktop and stacks
 * top-to-bottom on narrow screens, so nothing ever shrinks below
 * readable size or forces the page to scroll sideways.
 */

export function Flow({ title, nodes }) {
  return (
    <div className="dg-flow">
      {title && <p className="dg-flow-title">{title}</p>}
      <ol className="dg-nodes">
        {nodes.map((n, i) => (
          <li className="dg-node-wrap" key={n.label}>
            <div className={`dg-node${n.tone ? ` dg-${n.tone}` : ""}`}>
              <span className="dg-node-label">{n.label}</span>
              {n.sub && <span className="dg-node-sub">{n.sub}</span>}
            </div>
            {i < nodes.length - 1 && (
              <span className="dg-arrow" aria-hidden="true">
                <i className="dg-arrow-line" />
                <i className="dg-arrow-head" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Lanes({ lanes }) {
  return (
    <div className="dg-lanes">
      {lanes.map((lane) => (
        <div className={`dg-lane dg-lane-${lane.tone}`} key={lane.name}>
          <div className="dg-lane-head">
            <span className="dg-lane-name">{lane.name}</span>
            <span className="dg-lane-verdict">{lane.verdict}</span>
          </div>
          <ol className="dg-lane-steps">
            {lane.steps.map((step, i) => (
              <li className="dg-lane-step" key={step}>
                <span className="dg-step-index">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export function Stack({ layers, aside }) {
  return (
    <div className="dg-stack-wrap">
      <ol className="dg-stack">
        {layers.map((l, i) => (
          <li className="dg-layer" key={l.name}>
            <span className="dg-layer-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="dg-layer-body">
              <span className="dg-layer-name">{l.name}</span>
              <span className="dg-layer-detail">{l.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      {aside && (
        <div className="dg-aside">
          <span className="dg-aside-name">{aside.name}</span>
          <span className="dg-aside-detail">{aside.detail}</span>
        </div>
      )}
    </div>
  );
}

export function Figure({ caption, children }) {
  return (
    <figure className="dg-figure">
      {children}
      {caption && <figcaption className="dg-caption">{caption}</figcaption>}
    </figure>
  );
}
